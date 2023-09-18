const aws_keys = require('../helpers/aws_keys')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito)

const signIn = async (req, res) => {
  var attributeList = []

  var dataName = {
    Name: 'name',
    Value: req.body.name,
  }

  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName)
  attributeList.push(attributeName)

  var dataEmail = {
    Name: 'email',
    Value: req.body.email,
  }
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
  attributeList.push(attributeEmail)

  var dataCarnet = {
    Name: 'custom:carnet',
    Value: req.body.carnet,
  }
  var attributeCarnet = new AmazonCognitoIdentity.CognitoUserAttribute(dataCarnet)

  attributeList.push(attributeCarnet)

  var crypto = require('crypto')
  var hash = crypto.createHash('sha256').update(req.body.password).digest('hex')
  console.log(attributeList)

  cognito.signUp(
    req.body.username,
    hash + 'D**',
    attributeList,
    null,
    async (err, data) => {
      if (err) {
        console.log(err)

        res.json(err.message || err)
        return
      }
      console.log(data)
      res.json(req.body.username + ' registrado')
    },
  )
}

const login = async (req, res) => {
  var crypto = require('crypto')
  var hash = crypto.createHash('sha256').update(req.body.password).digest('hex')

  var authenticationData = {
    Username: req.body.username,
    Password: hash + 'D**',
  }
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData,
  )
  var userData = {
    Username: req.body.username,
    Pool: cognito,
  }
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  // cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH')

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      // User authentication was successful
      res.json(result) //
    },
    onFailure: function (err) {
      // User authentication was not successful
      res.json(err)
    },
    mfaRequired: function (codeDeliveryDetails) {
      // MFA is required to complete user authentication.
      // Get the code from user and call
      cognitoUser.sendMFACode(verificationCode, this)
    },
  })
}

module.exports = { signIn, login }

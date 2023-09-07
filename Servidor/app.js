require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var rds = require('./routes/rds.routes.js')
var dynamodb = require('./routes/dynamo.routes.js')
var rekognition = require('./routes/rekognition.routes.js')
var app = express()

var s3 = require('./routes/s3.routes.js')

// MIDDLEWARES
app.set('port', 4000)
const cors = require('cors')
var corsOptions = { origin: true, optionsSuccessStatus: 200 }
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use('/rds', rds)
app.use('/s3', s3)
app.use('/dynamodb', dynamodb)
app.use('/rekognition', rekognition)
app.use('/', (req, res) => {
  res.send('Bienvenido a la API de AWS')
})

module.exports = app

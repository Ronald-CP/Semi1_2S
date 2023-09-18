const aws_keys = require('../helpers/aws_keys')
var AWS = require('aws-sdk')

const translate = new AWS.Translate(aws_keys.translate)

const traducirTexto = async (req, res) => {
  let texto = req.body.texto

  let params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: 'es',
    Text: texto,
  }

  translate.translateText(params, function (err, data) {
    if (err) {
      res.json({ mensaje: 'Error', data: err })
    } else {
      console.log(data)
      res.json({ traduccion: data })
    }
  })
}

module.exports = {
  traducirTexto,
}

var AWS = require('aws-sdk')

var s3 = new AWS.S3({ region: 'us-east-2' })
var rek = new AWS.Rekognition({ region: 'us-east-2' })

exports.handler = function (req, context, callback) {
  var id = req.nombre
  var foto = req.imagen

  var cadena = 'fotos/' + id + '.jpg'

  let buff = new Buffer.from(foto, 'base64')

  const params = {
    Bucket: 'bucket-semi1',
    Key: cadena,
    Body: buff,
    ContentType: 'image',
  }

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log('Error al insertar')
      callback('Error al insertar', err)
    } else {
      console.log('Imagen insertada exitosamente')
      callback(null, data)
    }
  })
}
exports.handler = function (req, context, callback) {
  var imagen = req.imagen
  var params = {
    Image: {
      Bytes: Buffer.from(imagen, 'base64'),
    },
    MaxLabels: 15, // cosas o similitudes que aparecen en la imagen
  }
  rek.detectLabels(params, function (err, data) {
    if (err) {
      console.log('Error al analizar')
      callback('Error al analizar', err)
    } else {
      console.log('Exito')
      callback(null, data)
    }
  })
}

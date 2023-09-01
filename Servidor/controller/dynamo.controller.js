const aws_keys = require('../helpers/aws_keys')
var AWS = require('aws-sdk') //importamos el sdk de aws

const s3 = new AWS.S3(aws_keys.s3)
const dynamoDB = new AWS.DynamoDB(aws_keys.dynamoDb)
/*************************** DYNAMO DB  ************************** */

//subir foto y guardar en dynamo
var saveImageDynamo = async (req, res) => {
  var id = req.body.id
  var foto = req.body.foto // Base 64

  //carpeta y nombre que quieran darle a la imagen

  var cadena = 'fotos/' + id + '.jpg' // fotos -> se llama la carpeta UBICACION
  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64')

  let params = {
    Bucket: 'bucket-semi12023',
    Key: cadena,
    Body: buff,
    ACL: 'public-read', // ACL -> LE APLICA LA POLITICA AL OBJETO QUE SE ESTA GUARDANDO, politica de solo lectura y publica
  }

  s3.upload(params, function (err, data) {
    if (err) {
      console.log('Error', err)
    }
    if (data) {
      console.log('Upload Success', data.Location)
      console.log(data)

      dynamoDB.putItem(
        {
          TableName: 'Clase6_dynamo',
          Item: {
            id: { S: '1' },
            name: { S: id },
            url: { S: data.Location },
          },
        },
        function (err, data) {
          if (err) {
            console.log('Error', err)
          } else {
            console.log('Success', data)
            res.json({ status: true })
          }
        },
      )
    }
  })
}

var getImageDynamo = async (req, res) => {
  let params = {
    TableName: 'Clase6_dynamo',
    Key: {
      id: { S: '1' },
    },
  }

  dynamoDB.getItem(params, function (err, data) {
    if (err) {
      console.log(err)
      res.json({ mensaje: 'Error al obtener la imagen', error: err, status: false })
    } else {
      console.log(data)
      res.json({
        mensaje: 'Imagen obtenida exitosamente de Dynamo',
        data: data,
        status: true,
      })
    }
  })
}

module.exports = {
  saveImageDynamo,
  getImageDynamo,
}

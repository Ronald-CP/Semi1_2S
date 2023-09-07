const aws_keys = require('../helpers/aws_keys')
var AWS = require('aws-sdk')

const rek = new AWS.Rekognition(aws_keys.rekognition)

var detectarCara = async (req, res) => {
  var imagen = req.body.imagen

  var params = {
    // S3Object: {
    //     Bucket: "mybucket",
    //     Name: "mysourceimage"
    //   }
    Image: {
      Bytes: Buffer.from(imagen, 'base64'), // se manda la imagen en bytes.
    },
    Attributes: ['ALL'], // Para que se muestren todos los atributos en la deteccion de cara. Como filtros.
  }

  rek.detectFaces(params, function (err, data) {
    if (err) {
      res.json({ mensaje: 'Error', data: err })
    } else {
      res.json({ Deteccion: data })
    }
  })
}

var detectarTexto = async (req, res) => {
  var imagen = req.body.image
  var params = {
    Image: {
      Bytes: Buffer.from(imagen, 'base64'),
    },
  }
  rek.detectText(params, function (err, data) {
    if (err) {
      res.json({ mensaje: 'Error' })
    } else {
      res.json({ texto: data.TextDetections })
    }
  })
}

const detectarFamoso = async (req, res) => {
  var imagen = req.body.image
  var params = {
    Image: {
      Bytes: Buffer.from(imagen, 'base64'),
    },
  }
  rek.recognizeCelebrities(params, function (err, data) {
    if (err) {
      console.log(err)
      res.json({ mensaje: 'Error al reconocer' })
    } else {
      res.json({ artistas: data })
    }
  })
}

// Obtener Etiquetas
const detectarEtiquetas = async (req, res) => {
  var imagen = req.body.imagen
  var params = {
    Image: {
      Bytes: Buffer.from(imagen, 'base64'),
    },
    MaxLabels: 10, // cosas o similitudes que aparecen en la imagen
  }
  rek.detectLabels(params, function (err, data) {
    if (err) {
      res.json({ mensaje: 'Error' })
    } else {
      res.json({ texto: data.Labels })
    }
  })
}

const compararFotos = async (req, res) => {
  var imagen1 = req.body.imagen1
  var imagen2 = req.body.imagen2
  var params = {
    SourceImage: {
      Bytes: Buffer.from(imagen1, 'base64'), // Imagen principal
    },
    TargetImage: {
      Bytes: Buffer.from(imagen2, 'base64'), // Imagen para comparar
    },
    SimilarityThreshold: '50', // porcentaje para hacer en la comparacion, limite de similitud
  }
  rek.compareFaces(params, function (err, data) {
    if (err) {
      res.json({ mensaje: err })
    } else {
      res.json({ Comparacion: data.FaceMatches })
    }
  })
}

const detectarEquipo = async (req, res) => {
  var imagen = req.body.imagen
  var params = {
    Image: {
      Bytes: Buffer.from(imagen, 'base64'), // se manda la imagen en bytes.
    },
    SummarizationAttributes: {
      MinConfidence: 80,
      RequiredEquipmentTypes: ['FACE_COVER'],
    },
  }
  rek.detectProtectiveEquipment(params, function (err, data) {
    if (err) {
      res.json({ mensaje: 'Error' })
    } else {
      res.json({ Deteccion: data })
    }
  })
}

module.exports = {
  detectarCara,
  detectarTexto,
  detectarFamoso,
  detectarEtiquetas,
  compararFotos,
  detectarEquipo,
}

// se manda a llamar las credenciales de Mysql

const conn = require('../database/db.js')

//*********************************************RDS******************************************************

// INSERT BASE DE DATOS

var insertarRDS = async (req, res) => {
  let body = req.body
  conn.query(
    'INSERT INTO `usuario` (`id`, `nombre`) VALUES (?, ?)',
    [body.id, body.nombre],
    function (err, result) {
      if (err) {
        console.log(err)
        res.json({ mensaje: 'Error al insertar', error: err, status: false })
      } else {
        res.json({ mensaje: 'Insertado exitosamente', status: true })
      }
    },
  )
}

// OBTENER BASE DE DATOS
var obtenerRDS = async (req, res) => {
  conn.query('SELECT * FROM usuario', function (err, result) {
    if (err) {
      console.log(err)
      res.json({ mensaje: 'Error al obtener', error: err, status: false })
    } else {
      res.json({ mensaje: 'Obtenido exitosamente', data: result, status: true })
    }
  })
}

module.exports = {
  insertarRDS,
  obtenerRDS,
}

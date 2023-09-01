var Router = require('express')
const { insertarRDS, obtenerRDS } = require('../controller/rds.controller')

const router = Router()

router.post('/insertar', insertarRDS)
router.get('/obtener', obtenerRDS)
module.exports = router

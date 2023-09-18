var Router = require('express')
var { traducirTexto } = require('../controller/translate.controller')

const router = Router()

router.post('/', traducirTexto)
module.exports = router

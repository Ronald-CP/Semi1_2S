var Router = require('express')
var { getImage, saveImage } = require('../controller/s3.controller')

const router = Router()

router.post('/subirfoto', saveImage)
router.post('/obtenerfoto', getImage)
module.exports = router

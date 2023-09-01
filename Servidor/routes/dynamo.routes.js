var Router = require('express')
const { getImageDynamo, saveImageDynamo } = require('../controller/dynamo.controller')

const router = Router()

router.post('/insertar', saveImageDynamo)
router.get('/obtener', getImageDynamo)
module.exports = router

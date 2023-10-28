var Router = require('express')
const { init } = require('../controller/lex.controller')

const router = Router()

router.post('/init', init)

module.exports = router

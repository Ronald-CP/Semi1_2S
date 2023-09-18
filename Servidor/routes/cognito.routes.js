var Router = require('express')
const { signIn, login } = require('../controller/cognito.controller')

const router = Router()

router.post('/login', login)
router.post('/signIn', signIn)

module.exports = router

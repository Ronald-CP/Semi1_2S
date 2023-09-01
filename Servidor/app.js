require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var s3 = require('./routes/s3.routes.js')

// MIDDLEWARES
app.set('port', 4000)
const cors = require('cors')
var corsOptions = { origin: true, optionsSuccessStatus: 200 }
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use('/s3', s3)
app.use('/', (req, res) => {
  res.send('Bienvenido a la API de AWS')
})

module.exports = app

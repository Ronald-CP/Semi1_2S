const mysql = require('mysql')

let db_credentials = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}

var conn = mysql.createPool(db_credentials)

module.exports = conn

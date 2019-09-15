require('dotenv').config()
const Pool = require('pg').Pool //const { Pool } = require('pg')

const pool = new Pool({
  user: 'api_user',
  host: 'localhost',
  database: 'api',
  password: 'api_user',
  port: 5432,
})

/* For Heroku

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})
*/

module.exports = { pool }
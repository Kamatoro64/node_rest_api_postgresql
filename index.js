const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const pool = require('./config').pool // const { pool } = require('./config')
const routes = require('./routes/api')

const app = express()

// app set
app.set('port', process.env.PORT || 3000);

// Middlware

// Use morgan middleware if NODE_ENV is not set to test (it is set in users.js)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan('tiny'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', routes); // You have to add the bodyParser middleware before routes! 

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server is up and listening on port ${app.get('port')}...`);
})

// For testing via Mocha
module.exports = app;
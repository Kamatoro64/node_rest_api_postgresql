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
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', routes); // You have to add the bodyParser middleware before routes! 

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server is up and listening on port ${app.get('port')}...`);
})

module.exports = app;
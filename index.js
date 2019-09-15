const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const pool = require('./config').pool // const { pool } = require('./config')

const app = express()

// Middlware

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Functions
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const deleteUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({ status: 'success', message: 'User deleted.' })
    })
}


const addUser = (request, response) => {
  console.log('Trying to add user')
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'User added.' })
  })
}

app
  .route('/users')
  // GET endpoint
  .get(getUsers)
  // POST endpoint
  .post(addUser)

app
  .route('/users/:id')
  .get(getUserById)
  .delete(deleteUserById)


// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
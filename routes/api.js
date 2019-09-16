const express = require('express');
const router = express.Router();
const pool = require('../config').pool // const { pool } = require('./config')
// Mount our route handlers onto router (instead of app.get use router.get)


// Get list of users - Tested via Postman
router.get('/users', (req, res) => {
	pool.query('SELECT * FROM users', (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).json(results.rows)
	})
})

// Add single user - Tested via Postman
router.post('/users', (req, res) => {
	const { name, email } = req.body

	pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], error => {
		if (error) {
			throw error
		}
		res.status(201).json({ status: 'success', message: 'User added.' })
	})
})

// Get single user - Tested via Postman
router.get('/users/:id', (req, res) => {
	const id = parseInt(req.params.id)

	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).json(results.rows)
	})
})

// Delete single user - Tested via Postman
router.delete('/users/:id', (req, res) => {
	const id = parseInt(req.params.id)

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).json({ status: 'success', message: 'User deleted.' })
	})
})

module.exports = router;
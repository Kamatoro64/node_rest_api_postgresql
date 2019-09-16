// This is read by index.js which switches off morgan NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const pool = require('../config').pool;
const should = require('should')

chai.use(chaiHttp);

// Switch of test DB at some point

// Callback hell! This looks terrible how do we use promises or async await!
pool.query("DROP TABLE IF EXISTS users", (error, results) => {
	if (error) {
		throw error
	}

	pool.query("CREATE TABLE users(ID SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)", (error, results) => {
		if (error) {
			throw error
		}

		pool.query("INSERT INTO users (name, email) VALUES  ('John', 'john@example.com');", (error, results) => {
			if (error) {
				throw error
			}


		})


	})
})

beforeEach(done => setTimeout(done, 1000));

describe('/GET /api/users', () => {
	it('it should GET all the users', (done) => {
		chai.request(server)
			.get('/api/users')
			.end((err, res) => {
				res.should.have.property('status', 200);
				res.body.should.be.json;
				res.body.should.be.array;
				res.body.length.should.be.eql(1);
				done();
			});
	});
});









describe('/POST /api/users', () => {
	it('it should POST a user', (done) => {
		let user = {
			name: "Sophia",
			email: "sophia@example.com"
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.property('status', 201);
				//res.body.should.be.a('object');
				//res.body.should.have.property('errors');
				//res.body.errors.should.have.property('pages');
				//res.body.errors.pages.should.have.property('kind').eql('required');
				done();
			});
	});

});


describe('/GET /api/users', () => {
	it('it should GET all the users', (done) => {
		chai.request(server)
			.get('/api/users')
			.end((err, res) => {
				res.should.have.property('status', 200);
				res.body.should.be.json;
				res.body.should.be.array;
				res.body.length.should.be.eql(2);
				done();
			});
	});
});

// This is read by index.js which switches off morgan NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const pool = require('../config').pool;
const should = require('should')
const assert = require('assert');

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


beforeEach(done => setTimeout(done, 500));

// GET All Users
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

// POST a single user - Well formatted
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

// POST a single user - Missing Email & Name
describe('/POST /api/users', () => {
	it('it should not insert users if both name and email are not provided', (done) => {
		let user = {
			name: "",
			email: ""
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.property('status', 422);
				done();
			});
	});

});

// POST a single user - Missing Name
describe('/POST /api/users', () => {
	it('it should not insert users if name is not provided', (done) => {
		let user = {
			name: "",
			email: "sophia@example.com"
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.property('status', 422);
				assert.equal(res.body.errors[0].msg, 'name is required');
				done();
			});
	});

});


// POST a single user - Missing Email
describe('/POST /api/users', () => {
	it('it should not insert users if email is not provided', (done) => {
		let user = {
			name: "Sophia",
			email: ""
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.property('status', 422);
				assert.equal(res.body.errors[0].msg, 'email is required');
				assert.equal(res.body.errors[1].msg, 'Invalid email format');
				done();
			});
	});

});


// POST a single user - Incorrect Email format
describe('/POST /api/users', () => {
	it('it should not insert users if email is in incorrect format', (done) => {
		let user = {
			name: "Sophia",
			email: "sophiaexample.com"
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.property('status', 422);
				assert.equal(res.body.errors[0].msg, 'Invalid email format');
				done();
			});
	});

});

// GET Single user by id, user exists
describe('/GET /api/users/1', () => {
	it('it should GET user with id=1', (done) => {
		chai.request(server)
			.get('/api/users/1')
			.end((err, res) => {
				res.should.have.property('status', 200);
				res.body.should.be.json;
				res.body.length.should.be.eql(1);
				assert.equal(res.body[0].id, 1)
				done();
			});
	});
});

// GET Single user by id, user does not exists
describe('/GET /api/users/0', () => {
	it('it should return status code 404 when user with id=0 is requested', (done) => {
		chai.request(server)
			.get('/api/users/0')
			.end((err, res) => {
				res.should.have.property('status', 404);
				res.body.should.be.json;
				assert.equal(res.body.msg, "User not found")
				done();
			});
	});
});

// DELETE Single user by id, user exists
describe('/DELETE /api/users/1', () => {
	it('it should DELETE user with id=1', (done) => {
		chai.request(server)
			.delete('/api/users/1')
			.end((err, res) => {
				res.should.have.property('status', 200);
				res.body.should.be.json;
				assert.equal(res.body.status, "success");
				assert.equal(res.body.msg, "User deleted");
				done();
			});
	});
});

// GET Single user by id, user does not exists
describe('/GET /api/users/0', () => {
	it('it should return status code 404 when user with id=0 is requested', (done) => {
		chai.request(server)
			.delete('/api/users/0')
			.end((err, res) => {
				res.should.have.property('status', 404);
				res.body.should.be.json;
				assert.equal(res.body.status, "error");
				assert.equal(res.body.msg, "User not found");
				done();
			});
	});
});
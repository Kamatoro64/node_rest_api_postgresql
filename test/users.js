// At some point point this to a test DB
// process.env.NODE_ENV = 'test'; 

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = require('should')

chai.use(chaiHttp);

describe('/GET users', () => {
	it('it should GET all the users', (done) => {
		chai.request(server)
			.get('/api/users')
			.end((err, res) => {
				res.should.have.property('status', 200);
				res.body.should.be.json;
				res.body.should.be.array;
				res.body.length.should.be.eql(3);
				done();
			});
	});
});
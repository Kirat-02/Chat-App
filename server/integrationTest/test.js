var assert = require('assert');
var app = require('../server.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Server test', function() {
    // The function passed to before() is called before running the test cases.
    before(function() {
        console.log("before test");
    });

    // The function passed to after() is called after running the test cases.
    after(function() {
        console.log("after test");
    });

    // Route to get all the users
    describe('/api/getuserlist', () => {
        it('it should get all the users', (done) => {
            chai.request(app)
                .get('/api/getuserlist')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    // Routes for getting user by its id
    describe('/api/login', () => {
        it('it should get user 1', (done) => {
            chai.request(app).post('/api/login')  
            .set('content-type', 'application/json')
            .send({'username': 'kirat', 'password': '123'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('name');
                    done();
                });
        });
    });

    /*
    describe('/api/getitem', () => {
        it('it should get product 2', (done) => {
            chai.request(app).post('/api/getitem')  
            .set('content-type', 'application/json')
            .send({'productid': 2})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('productid');
                    done();
                });
        });
    });

    // Routes for updating product by its id
    describe('/api/update', () => {
        it('it should update a product 1', (done) => {
            chai.request(app).post('/api/update')  
            .set('content-type', 'application/json')
            .send({'productid': 1, 'productname': 'iPhone XR', 'productdesc': 'latest iPhone', 'productprice': '15', 'productunits': '2'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body['ok'].should.have.property('productid');
                    done();
                });
        });
    });

    describe('/api/update', () => {
        it('it should update a product 2', (done) => {
            chai.request(app).post('/api/update')  
            .set('content-type', 'application/json')
            .send({'productid': 2, 'productname': 'Samsung TV', 'productdesc': 'latest TV', 'productprice': '25', 'productunits': '4'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body['ok'].should.have.property('productid');
                    done();
                });
        });
    });

    // Routes for deleting a product
    describe('/api/deleteitem', () => {
        it('it should delete the product 1', (done) => {
            chai.request(app).post('/api/deleteitem')  
            .set('content-type', 'application/json')
            .send({'productid': 1})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/api/deleteitem', () => {
        it('it should delete the product 2', (done) => {
            chai.request(app).post('/api/deleteitem')  
            .set('content-type', 'application/json')
            .send({'productid': 2})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Routes for adding new product
    describe('/api/add', () => {
        it('it should add a new product 1', (done) => {
            chai.request(app).post('/api/add')  
            .set('content-type', 'application/json')
            .send({'productid': 1, 'productname': 'iPhone XR', 'productdesc': 'latest iPhone', 'productprice': '15', 'productunits': '2'})
                .end((err, res) => {
                    res.body.should.have.property('err');
                    done();
                });
        });
    });

    describe('/api/add', () => {
        it('it should add a new product 2', (done) => {
            chai.request(app).post('/api/add')  
            .set('content-type', 'application/json')
            .send({'productid': 2, 'productname': 'Samsung TV', 'productdesc': 'latest TV', 'productprice': '20', 'productunits': '4'})
                .end((err, res) => {
                    res.body.should.have.property('err');
                    done();
                });
        });
    });*/
});
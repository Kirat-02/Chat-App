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

    // Route to get all groups members
    describe('/api/groupMembers/1', () => {
        it('it should get all the groups', (done) => {
            chai.request(app)
                .get('/api/groupMembers/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // get all members of a group
    describe('/api/getgroups', () => {
        it('it should get all the groups', (done) => {
            chai.request(app)
                .get('/api/getgroups')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

     // Route to update user
     describe('/api/adduser', () => {
        let formData = new FormData();
        let user = {id: 9, name: 'test-2', email: 'test@gmail.com', password: '111', role: 'normal', groups: [], image:''}
        const data = JSON.stringify(user)
        formData.append('data', data);
        it('it should add a new user', (done) => {
            chai.request(app).post('/api/adduser')  
            .set('content-type', 'application/json')
            .send(formData)
                .end((err, res) => {
                    done();
                });
        });
    });

    // Routes for getting user by its id
    describe('/api/login', () => {
        it('it should get user test-2', (done) => {
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

    // Route to update user
    describe('/api/updateuser', () => {
        it('it should update user role to super', (done) => {
            chai.request(app).post('/api/updateuser')  
            .set('content-type', 'application/json')
            .send({'id': 9})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    done();
                });
        });
    });

   

    // Route to create new group
    describe('/api/addgroup', () => {
        it('it should add user to group', (done) => {
            chai.request(app).post('/api/addgroup')  
            .set('content-type', 'application/json')
            .send({'id': 100, 'name': 'test scripts'})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Route to create new channel
    describe('/api/newchannel', () => {
        it('it should create a new channel', (done) => {
            chai.request(app).post('/api/newchannel')  
            .set('content-type', 'application/json')
            .send({'id': 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    
    // route to add user to group
    describe('/api/addusergroup', () => {
        it('it should add user to group', (done) => {
            chai.request(app).post('/api/addusergroup')  
            .set('content-type', 'application/json')
            .send({'userid': 9, 'groupid': 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // route to upgrade user role to group assistant
    describe('/api/groupAssistant', () => {
        it('it should add user to channel', (done) => {
            chai.request(app).post('/api/groupAssistant')  
            .set('content-type', 'application/json')
            .send({'userid': 9, 'groupid': 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });    

    // route to upgrade user role to group admin
    describe('/api/groupAdmin', () => {
        it('it should add user to channel', (done) => {
            chai.request(app).post('/api/groupAdmin')  
            .set('content-type', 'application/json')
            .send({'userid': 9, 'groupid': 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // route to remove user from group
    describe('/api/deleteusergroup', () => {
        it('it should delete teh group', (done) => {
            chai.request(app).post('/api/deletegroup')  
            .set('content-type', 'application/json')
            .send({ 'userid':9, 'groupid': 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // route to delete group
    describe('/api/deletegroup', () => {
        it('it should delete teh group', (done) => {
            chai.request(app).post('/api/deletegroup')  
            .set('content-type', 'application/json')
            .send({'id': 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Route to delete user
    describe('/api/deleteuser', () => {
        it('it should delete a user', (done) => {
            chai.request(app).post('/api/deleteuser')  
            .set('content-type', 'application/json')
            .send({'id': 9})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
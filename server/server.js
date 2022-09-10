var express = require('express');
var app = express();

fs = require('fs'),
http = require('http'),
    PORT = 3001,
    PORT2 = 8888;


var cors = require('cors');
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var http = require("http").Server(app);

var server = http.listen(3000, function(){
    console.log("Server listening on port 3000");
});

// login and getting user setting
app.post('/login', require('./router/authenticate'));
app.get('/groups/:userid', require('./router/groups'));

// user methods
app.get('/userlist', require('./router/users'));
app.post('/adduser', require('./router/addUser'));
app.delete('/deleteuser/:name', require('./router/deleteUser'));

// channel messages list
app.get('/channels/:channelid', require('./router/channel'));
app.post('/channels/:channelid/newmessage', require('./router/newMessage'));

// routes to view and add members to groups and channels
app.get('/:type/:groupid/members', require('./router/members'));
app.get('/group/:groupid/:type/:channelid/members', require('./router/members'));

app.post('/:type/:groupid/addmember', require('./router/addmember'));
app.post('/group/:groupid/:type/:channelid/addmember', require('./router/addmember'));

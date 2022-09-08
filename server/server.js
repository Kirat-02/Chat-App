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

app.post('/login', require('./router/authenticate'));
app.get('/groups/:userid', require('./router/groups'));

app.get('/userlist', require('./router/users'));
app.post('/adduser', require('./router/adduser'));
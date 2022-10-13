// Import the modules required
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require ('body-parser');

var PeerServer = require('peer').PeerServer;

const MongoClient = require('mongodb').MongoClient;

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
})

const sockets = require('./sockets.js');
const server  = require('./listen.js');

// use the modules
app.use(cors());
app.use(bodyParser.json());


// url of the mongodb server
const url = 'mongodb://localhost:27017/';

// Start the client
MongoClient.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, function(err, client) {
    
    if (err) {return console.log(err)}

        const dbName = 'chatApp';
        const db = client.db(dbName);

        // Login 
        require('./routes/api-login.js')(db, app);

        // Group Details 
        require('./routes/api-getgroups.js')(db, app);

        // user list
        require('./routes/api-getuserlist.js')(db, app);

        // add new user
        require('./routes/api-adduser.js')(db, app);

        // update user to super
        require('./routes/api-updateuser.js')(db, app);

        // delete user
        require('./routes/api-deleteuser.js')(db, app);

        // add a new group
        require('./routes/api-addgroup.js')(db, app);

        // delete the group
        require('./routes/api-deletegroup.js')(db, app);

        // gets members of a group
        require('./routes/api-getgroupmembers.js')(db, app);

        // adds user to group
        require('./routes/api-addusergroup.js')(db, app);

        // removes user from group
        require('./routes/api-deleteusergroup.js')(db, app);

        // upgrades user to group assistant
        require('./routes/api-groupAssistant.js')(db, app);

        // upgrades user to group admin
        require('./routes/api-groupAdmin.js')(db, app);

        // add a new channel
        require('./routes/api-newchannel.js')(db, app);

        // delete a channel
        require('./routes/api-deletechannel.js')(db, app);

        // channel users list
        require('./routes/api-loadchannelmembers')(db, app);

        // used to add user to a channel
        require('./routes/api-adduserchannel')(db, app);

        // used to remove user from channel
        require('./routes/api-deleteuserchannel')(db, app);

        // used to get all messages in a chat
        require('./routes/api-getmessages')(db, app);

        // used to add a new message in a chat
        require('./routes/api-addmessage')(db, app);

        // upload Image in a chat
        require('./routes/api-uploadImage')(db, app);

});


sockets.connect(io, 3000);
server.listen(http, 3000);

/*
var server2 = PeerServer({
    host: "http://localhost",
    port: 3000,
    path: '/peerjs'
});*/
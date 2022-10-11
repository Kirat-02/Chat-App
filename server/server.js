// Import the modules required
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require ('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// use the modules
app.use(cors());
app.use(bodyParser.json());

// url of the mongodb server
const url = 'mongodb://localhost:27017/';

// Start the client
MongoClient.connect(url, {useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    
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



        /*
        // user add and delete
        require('./routes/api-adduser.js')(db, app);
        require('./routes/api-deleteuser.js')(db, app);

        // channel details
        require('./routes/api-userchannels.js')(db, app);

        // messages

        require('./routes/api-add.js')(db,app);
        require('./routes/api-prodcount.js')(db,app);
        require('./routes/api-validid.js')(db,app);
        require('./routes/api-getlist.js')(db,app);
        require('./routes/api-getitem.js')(db, app);
        require('./routes/api-update.js') (db, app);
        require('./routes/api-deleteitem.js') (db,app, ObjectID); */

});

module.exports = app.listen(3000, () =>{
    console.log("Server is listening on port 3000");
});

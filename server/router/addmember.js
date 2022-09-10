const { channel } = require('diagnostics_channel');
const { json } = require('express');
var fs = require('fs');

module.exports = function(req, res) {

    // group details
    page = req.params['type'];
    groupid = req.params['groupid'];

    // if it is a group request
    if(page == 'group'){

        // field input by the user
        newuser = req.body;

        fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
            {
                if (err) throw err;
                let users = JSON.parse(data);
                let i = users.findIndex(user => (user.userid == newuser.userid));                
                users[i].groups.push(Number(groupid));
                
                fs.writeFileSync("./data/extendedUsers.json", JSON.stringify(users))
            }
        );

        fs.readFile('./data/groups.json', 'utf8', function(err, data) 
            {
                if (err) throw err;
                let groups = JSON.parse(data);
                let i = groups.findIndex(group => (group.groupid == groupid)); 
                groups[i].members.push(Number(newuser.userid));  

                if(newuser.userrole == 'admin') {
                    groups[i].admins.push(Number(newuser.userid));  
                } else if (newuser.userrole == 'assistant'){
                    groups[i].assistant.push(Number(newuser.userid)); 
                }

                fs.writeFileSync("./data/groups.json", JSON.stringify(groups))
            }
        ); 

    } else if (page == 'channel'){

        channelid = req.params['channelid'];

        fs.readFile('./data/groups.json', 'utf8', function(err, data) 
            {
                if (err) throw err;
                let groups = JSON.parse(data);
                let i = groups.findIndex(group => (group.groupid == groupid)); 
                let j = groups[i].channels.findIndex(channel => (channel.channelid == channelid))
                groups[i].channels[j].members.push(Number(req.body.userid));
                fs.writeFileSync("./data/groups.json", JSON.stringify(groups))
            }
        ); 
    } else {
        if (err) throw err;
    }
}
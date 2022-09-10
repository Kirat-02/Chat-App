var fs = require('fs');

module.exports = function(req, res) {

    page = req.params['type'];
    groupid = req.params['groupid'];

    if(page=='group'){

        fs.readFile('./data/groups.json', 'utf8', function(err, data) 
            {
                // the above path is with respect to where we run server.js
                if (err) throw err;
                let groups = JSON.parse(data);

                // selects the group from the array with the match
                let i = groups.findIndex(group => (group.groupid == groupid));
                let group = groups[i];
                var userlist = [];

                fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
                {
                    // the above path is with respect to where we run server.js
                    if (err) throw err;
                    let users = JSON.parse(data);
                    
                    for(x=0; x<group['members'].length; x++){
                        let i = users.findIndex(user => (user.userid == group['members'][x]));                
                        userlist.push(users[i]);
                    };

                    let difference = users.filter(z => !userlist.includes(z)).concat(userlist.filter(z => !users.includes(z)));
                    
                    // send details of group adn members 
                    finaldata = [group, userlist, difference];
                    res.send(finaldata);
        
                })
            }
        )

    } else if(page=='channel'){

        channelid = req.params['channelid'];
        
        fs.readFile('./data/groups.json', 'utf8', function(err, data) 
            {
                // the above path is with respect to where we run server.js
                if (err) throw err;
                let groups = JSON.parse(data);

                // selects the group from the array with the match
                let i = groups.findIndex(group => (group.groupid == groupid));
                let j = groups[i].channels.findIndex(channel =>(channel.channelid==channelid));
                let channel  = groups[i].channels[j]
                var userlist = [];
                var groupmembers = [];
                let userids = groups[i].members.filter(z => !groups[i].channels[j].members.includes(z)).concat(groups[i].channels[j].members.filter(z => !groups[i].members.includes(z)));
                
                fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
                {
                    // the above path is with respect to where we run server.js
                    if (err) throw err;
                    let users = JSON.parse(data);
                        
                    for(x=0; x<groups[i].channels[j]['members'].length; x++){
                        let m = users.findIndex(user => (user.userid == groups[i].channels[j]['members'][x]));                
                        userlist.push(users[m]);
                    };

                    for(x=0; x<userids.length; x++){
                        let n = users.findIndex(user => (user.userid == Number(userids[x])));                
                        groupmembers.push(users[n]);
                    };

                    
                    // send details of channel and members 
                    finaldata = [channel, userlist, groupmembers];
                    res.send(finaldata);
        
                })
                
            }
        )
    }

}
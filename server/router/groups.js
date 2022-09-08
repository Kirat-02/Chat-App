var fs = require('fs');

module.exports = function(req, res) {

    userid = req.params['userid'];

    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
        {
            // the above path is with respect to where we run server.js
            if (err) throw err;
            let userArray = JSON.parse(data);

            // selects the user from the array with the match
            let i = userArray.findIndex(user => (user.userid == userid));

            let groups = userArray[i]['groups'];
            
            var groupData = [];

            fs.readFile('./data/groups.json', 'utf8', function(err, data) 
                {
                    let groupArray = JSON.parse(data);
                    
                    for (let j = 0; j < groups.length; j++) {

                        let x = groupArray.findIndex(group => (group.groupid == groups[j]));
                        groupData.push(groupArray[x]);

                    }

                    res.send(groupData);
                }
            )
        }
    )
}
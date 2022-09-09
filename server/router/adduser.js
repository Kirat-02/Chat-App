const { json } = require('express');
var fs = require('fs');

module.exports = function(req, res) {

    // field input by the user
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    fs.readFile('./data/users.json', 'utf8', function(err, data) 
        {
            let newuser = {
                username: name,
                pwd: password
            }
            if (err) throw err;
            var json = JSON.parse(data)
            json.push(newuser)
            fs.writeFileSync("./data/users.json", JSON.stringify(json))
        }
    );  

    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
        {
            if (err) throw err;
            let extendedUserArray = JSON.parse(data);
            let lastuserid = extendedUserArray[extendedUserArray.length -1].userid;
            let newuser2 = {
                userid: lastuserid+1,
                username: name,
                useremail: email,
                userrole: 'User',
                groups: []
            }

            var json = JSON.parse(data)
            json.push(newuser2)
            fs.writeFileSync("./data/extendedUsers.json", JSON.stringify(json))
        }
    );

}
var fs = require('fs');

module.exports = function(req, res) {

    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
        {
                
            // the above path is with respect to where we run server.js
            if (err) throw err;
            let extendedUserArray = JSON.parse(data);
            let userData = extendedUserArray;
        
            res.send(userData);
        }
    );
}
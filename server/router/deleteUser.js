const { json } = require('express');
var fs = require('fs');

module.exports = function(req, res) {

    // field input by the user
    username = req.params['name'];
    
    fs.readFile('./data/users.json', 'utf8', function(err, data) 
        {
            if (err) throw err;
            var arr = JSON.parse(data)

            const removeById = (arr, id) => {
                const requiredIndex = arr.findIndex(el => {
                   return el.username === username;
                });
                if(requiredIndex === -1){
                   return false;
                };
                return !!arr.splice(requiredIndex, 1);
             };

            removeById(arr, 5);
            fs.writeFileSync("./data/users.json", JSON.stringify(arr))
        }
    );  

    
    fs.readFile('./data/extendedUsers.json', 'utf8', function(err, data) 
        {
            if (err) throw err;
            var arr = JSON.parse(data)

            const removeById = (arr, id) => {
                const requiredIndex = arr.findIndex(el => {
                   return el.username === username;
                });
                if(requiredIndex === -1){
                   return false;
                };
                return !!arr.splice(requiredIndex, 1);
             };

            removeById(arr, 5);


            fs.writeFileSync("./data/extendedUsers.json", JSON.stringify(arr))
        }
    ); 

}
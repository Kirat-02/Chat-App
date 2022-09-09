var fs = require('fs');

module.exports = function(req, res) {

    channelid = req.params['channelid'];

    fs.readFile('./data/channelMessages.json', 'utf8', function(err, data) 
        {
            // the above path is with respect to where we run server.js
            if (err) throw err;
            let channels = JSON.parse(data);

            // selects the user from the array with the match
            let i = channels.findIndex(channel => (channel.channelid == channelid));
            let messages = channels[i];
            res.send(messages);
        }
    )
}
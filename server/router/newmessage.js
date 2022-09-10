var fs = require('fs');

module.exports = function(req, res) {

    // field input by the user
    var message = req.body;
    channelid = req.params['channelid'];
    
    fs.readFile('./data/channelMessages.json', 'utf8', function(err, data) 
        {
            if (err) throw err;
            let channels = JSON.parse(data);

            // selects the channel from the array with the match
            let i = channels.findIndex(channel => (channel.channelid == channelid));
            console.log(i);
            if(i == -1){
                let newconversation = {
                    "channelid": channelid,
                    "messages": [message]
                }
                channels.push(newconversation);
            } else {
                let currentChannel = channels[i];
                currentChannel["messages"].push(message);
                console.log(channels)
            }
            
            fs.writeFileSync("./data/channelMessages.json", JSON.stringify(channels)) 
        }
    );       
}
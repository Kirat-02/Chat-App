module.exports = function(db, app){
    app.get('/api/getmessages/:channelid',function(req,res){

        // get channel id from url
        channelid = parseInt(req.params.channelid)

        // used to all messages of a channel
        user = req.body;
        const collection = db.collection('messages');
        collection.find({channelid: channelid}).toArray((err,data)=>{
            if(data.length == 0){
                res.send({"message": "No Messages exist"})
            } else {
                channelData = data[0].messages.filter(message=> message.channelid = this.channelid);
                res.send(data);
            }
        }) 
    })
}

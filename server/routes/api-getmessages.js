module.exports = function(db, app){
    app.get('/api/getmessages/:channelid',function(req,res){

        // get channel id from url
        channelid = parseInt(req.params.channelid)

        // used to all messages of a channel
        user = req.body;
        const collection = db.collection('messages');
        collection.find({channelid: channelid}).toArray((err,data)=>{
            res.send(data);
        }) 

    })
}

module.exports = function(db, app){
    app.post('/api/addmessage',function(req,res){

        // get channel id, user id and message from request
        channelid = parseInt(req.body.channelid);
        userid = parseInt(req.body.userid);
        username = req.body.username;
        message = req.body.message;

        // used to all messages of a channel
        user = req.body;
        const collection = db.collection('messages');
        const options = { upsert: true };
        collection.updateOne({channelid: channelid}, {$push: {messages: {userid: userid, username: username, message: message, type: 'text'}}}, options, ()=>{
            res.send({'Message': 'Message Saved'});
        })

    })
}

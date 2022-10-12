module.exports = function(db, app){
    app.post('/api/addmessage',function(req,res){

        // get channel id, user id and message from request
        channelid = parseInt(req.body.channelid);
        userid = parseInt(req.body.userid);
        message = req.body.message;

        // used to all messages of a channel
        user = req.body;
        const collection = db.collection('messages');
        collection.updateOne({channelid: channelid}, ).toArray((err,data)=>{
            res.send(data);
        }) 

    })
}

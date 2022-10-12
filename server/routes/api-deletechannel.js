module.exports = function(db, app){
    app.post('/api/deletechannel',function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        channelid = req.body.channelid;
        groupid =  req.body.groupid;

        const collection = db.collection('groups');
        const collection2 = db.collection('channels');

        collection.updateOne({id: groupid},{$pull: {channels: {id: channelid}}}, ()=>{
        })

        collection2.deleteOne({channelid: channelid}, ()=>{
            res.send({'message': 'Channel Deleted'});
        })

    });
}
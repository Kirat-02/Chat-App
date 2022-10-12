module.exports = function(db, app){
    app.post('/api/newchannel', async function(req, res){
   
        var groupid = req.body.id;

        // get highest id from channel
        const collection = db.collection('channels');
        const collection2 = db.collection('groups');

        collection.find({}, {channelid: 1}).sort({channelid: -1}).limit(1).toArray(
            function(err, data){
                var newchannelid = data[0].channelid + 1
                collection.insertOne({channelid: newchannelid, messages: []})
                collection2.updateOne({id: groupid},{$push: {channels: {id: newchannelid, members: []}}})
            }
        )

        // append it and add new one and then add it into the file both groups and channels

    });
}
module.exports = function(db, app){
    app.post('/api/deletechannelmember',function(req,res){

        // gets the user data
        userid = parseInt(req.body.memberid);
        channelid =  parseInt(req.body.channelid);
    
        // operation to delete user from channel
        const collection = db.collection('groups');

        // get the current channels
        collection.find({channels: {$elemMatch: {id: channelid}}}).toArray((err,data)=>{

            // filter the channels and appends new data
            channels = data[0].channels;
            channelData = channels.filter(channel=> channel.id == channelid);
            newchanneldata = channelData[0].members
            const index = newchanneldata.indexOf(userid);
            if (index > -1) { // only splice array when item is found
                newchanneldata.splice(index, 1); // 2nd parameter means remove one item only
            }
            collection.updateOne({channels: {$elemMatch: {id: channelid}}}, {$set: {
                'channels.$.members': newchanneldata,
                'channels.$.id': channelid
            }}, ()=>{
                res.send({'message': 'User added to Channel'});
            })
        })
    });
}
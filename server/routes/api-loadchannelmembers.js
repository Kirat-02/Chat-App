// used to get channel members of a group
module.exports = function(db, app){
    app.get('/api/group/:groupid/channelusers/:channelid',function(req,res){

        // group id and channel id
        groupid = parseInt(req.params.groupid);
        channelid = parseInt(req.params.channelid);

        const collection = db.collection('groups');
        const collection2 = db.collection('users');

        collection.find({channels: {$elemMatch: {id: channelid}}}).toArray((err,data)=>{

            // channel data
            channels = data[0].channels;
            channelData = channels.filter(channel=> channel.id == channelid);

            // group Members
            groupMembers = data[0].members;

            // channel members
            channelMembers = channelData[0].members;

            // non members
            nonMembers = groupMembers.filter(x => !channelMembers.includes(x))

            // used to find group members
            collection2.find({ id : { $in : channelMembers }}).toArray((err, data)=>{
                members = data;

                // used to find non members
                collection2.find({ id : { $in : nonMembers }}).toArray((err, data)=>{

                    nonmembers = data;

                    res.send([channelData[0], members, nonmembers]);
                });
            })
        }); 
    })
}
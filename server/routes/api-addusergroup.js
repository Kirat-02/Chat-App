// Adds user to group
module.exports = function(db, app){
    app.post('/api/addusergroup',function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        // user and group details
        userid = req.body.userid;
        groupid =  req.body.groupid;
        const collection = db.collection('groups');
        collection.updateOne({id: groupid},{$push: {members: userid}}, ()=>{
            res.send({'message': 'User added to Group'});
        })
    });
}
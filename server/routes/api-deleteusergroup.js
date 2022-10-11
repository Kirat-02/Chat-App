module.exports = function(db, app){
    app.post('/api/deleteusergroup',function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        userid = req.body.userid;
        groupid =  req.body.groupid;
        const collection = db.collection('groups');
        collection.updateOne({id: groupid},{$pull: {members: userid}}, ()=>{
            res.send({'message': 'User removed from Group'});
        })
    });
}
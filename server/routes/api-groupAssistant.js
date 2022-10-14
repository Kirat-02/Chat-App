// upgrades user to group assistant
module.exports = function(db, app){
 
    app.post('/api/groupAssistant',function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        // user and group id
        userid = req.body.userid;
        groupid = req.body.groupid

        const collection = db.collection('groups');

        collection.updateOne({id: groupid}, {$push: {assistant: userid}}, ()=>{
            res.send({'message': 'User Updated to Assistant'});
        })
    });
}
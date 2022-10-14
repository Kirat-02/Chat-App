module.exports = function(db, app){
 
    app.post('/api/updateuser',function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        // id of user to be updated
        id = req.body.id;
        const collection = db.collection('users');

        collection.updateOne({id: id},{$set: {role: 'super'}}, ()=>{
            res.send({'message': 'User Updated to Super'});
        })
    });
}
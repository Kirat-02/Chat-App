module.exports = function(db, app, ObjectID){

    app.post('/api/deleteuser',function(req,res){
        if (!req.body) {
            return res.sendStatus(400);
        }

        id = req.body.id;
        const collection = db.collection('users');
        
        collection.deleteOne({id: id}, (err, docs)=>{
            collection.find({}).toArray((err, data)=>{
                res.send(data);
            });
        })
    })
}
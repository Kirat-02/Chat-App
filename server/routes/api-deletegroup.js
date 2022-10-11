module.exports = function(db, app){

    app.post('/api/deletegroup',function(req,res){
        if (!req.body) {
            return res.sendStatus(400);
        }

        id = req.body.id;
        const collection = db.collection('groups');
        
        collection.deleteOne({id: id}, (err, docs)=>{
            collection.find({}).toArray((err, data)=>{
                res.send(data);
            });
        })
    })
}
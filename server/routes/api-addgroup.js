module.exports = function(db, app){
    app.post('/api/addgroup', function(req, res){
        if (!req.body) {
            return res.sendStatus(400)
        }
        // gruop data
        var group = req.body;
        const collection = db.collection('groups');
        if(group.id == null){
            res.send({num:0, err:"ID can't be null"});
        } else {
            collection.find({id: group.id}).count((err, count)=>{
                if (count == 0) {

                    // group to be inserted
                    newgroup = {id: group.id, name: group.name, members:[], admins: [], assistant: [], channels: []}
                    
                    collection.insertOne(newgroup, (err, dbres)=>{
                        if (err) throw err;
                        let num = dbres.insertedCount;
                        res.send({ 'num': num, err: null});
                    })
                } else {
                    res.send({num:0, err: "Group with same id exists already"});
                }
            })
        }
    });
}
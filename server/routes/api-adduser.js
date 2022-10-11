module.exports = function(db, app){
    app.post('/api/adduser', function(req, res){
        if (!req.body) {
            return res.sendStatus(400)
        }
        user = req.body;
        const collection = db.collection('users');

        if(user.id == null){
            res.send({num:0, err:"ID can't be null"});
        } else {
            collection.find({id: user.id}).count((err, count)=>{

                if (count == 0) {
                    collection.insertOne(user, (err, dbres)=>{
                        if (err) throw err;
                            let num = dbres.insertedCount;
                            res.send({ 'num': num, err: null});
                        })
                } else {
                    res.send({num:0, err: "User with same id exists already"});
                }
            })
        }
    });
}
module.exports = function(db, app){
    app.get('/api/groupMembers/:id',function(req,res){
        const collection = db.collection('groups');
        const collection2 = db.collection('users');

        collection.find({id: parseInt(req.params.id)}).toArray((err,data)=>{

            let group = data;
            let groupMembers = data[0].members;

            var members = [];
            var nonmembers = [];

            collection2.find({ id : { $in : groupMembers }}).toArray((err, data)=>{
                members = data;
                collection2.find({ id : { $nin : groupMembers }}).toArray((err, data)=>{
                    nonmembers = data;
                    res.send({group: group, members: members, nonmembers: nonmembers});
                });
            })
        }); 
    })
}
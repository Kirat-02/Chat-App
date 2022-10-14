// used to get the list of all groups
module.exports = function(db, app){
    app.get('/api/getgroups',function(req,res){
        const collection = db.collection('groups');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        })
    })
}
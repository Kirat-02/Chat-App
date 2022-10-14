// returns teh complete list of users
module.exports = function(db, app){
    app.get('/api/getuserlist',function(req,res){
        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        })
    })
}
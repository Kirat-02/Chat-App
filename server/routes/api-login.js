// Returns the user data if teh user exists

module.exports = function(db, app){
    app.post('/api/login',function(req,res){
        user = req.body;
        const collection = db.collection('users');
        collection.find({name: user.username, password: user.password}).toArray((err,data)=>{
            res.send(data);
        }) 
    })
}
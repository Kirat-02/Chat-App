module.exports = function(db, app){
    app.post('/api/newchannel', function(req, res){
        if (!req.body) {
            return res.sendStatus(400)
        }

        // get highest id from channel

        // append it and add new one and then add it into the file both groups and channels

    });
}
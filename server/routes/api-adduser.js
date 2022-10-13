const multer  = require('multer')
const storage = multer.diskStorage({ 
    destination: '../src/assets/uploads', 
      filename: (req, file, cb) => {
          cb(null, file.originalname + '.jpeg')
        }
 })

var upload = multer({ storage: storage })

module.exports = function(db, app){
    app.post('/api/adduser', upload.single("files"), (req, res)=>{
        if (!req.body) {
            return res.sendStatus(400)
        }

        user = JSON.parse(req.body.data)

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
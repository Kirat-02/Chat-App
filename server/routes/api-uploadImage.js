// This is used to upload image in a chat

const multer  = require('multer')
const storage = multer.diskStorage({ 
    destination: '../src/assets/chat', 
      filename: (req, file, cb) => {
          cb(null, file.originalname + '.png')
        }
 })

var upload = multer({ storage: storage })

module.exports = function(db, app){
    app.post('/api/addmessageimage', upload.single("files"), (req, res)=>{
        if (!req.body) {
            return res.sendStatus(400)
        }
        message = JSON.parse(req.body.data)
        const collection = db.collection('messages');
        const options = { upsert: true };
        collection.updateOne({channelid: message.channelid}, {$push: {messages: {userid: message.userid, username: message.username, message: message.message, type: message.type, image: message.image}}}, options, ()=>{
            res.send({'Message': 'Message Saved'});
        })
    });
}
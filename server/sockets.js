module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.io);
            socket.on('message', (data)=>{
                io.emit('message', data);
            })
            socket.on('left', (data)=>{
                io.emit('left', data);
            })
        })
    }
}

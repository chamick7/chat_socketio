const { Socket } = require('dgram');
const http = require('http');
const app = require('./app');
const server = http.createServer(app)
const port = process.env.PORT || 5000
const io = require('socket.io')(server);



io.on('connection',(socket)=>{
    console.log('user connected');


    socket.on('join',(data) => {
        socket.join(data.room);
        console.log(data);
    });

    socket.on('msgToServer',(data) => {
        io.to(data.room).emit('msgToClient',{name:data.name,msg:data.msg});
    })

})




server.listen(port,()=>{
    console.log('Sever start at port ' + port);
})

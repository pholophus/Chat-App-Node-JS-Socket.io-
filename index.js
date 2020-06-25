//way to use express
var express = require('express');
//way to use socket.io
var socket = require('socket.io');

//App setup
var app = express();

var server = app.listen(4000, function() {
    console.log("listening to port 4000");
});

//Static files
//what this does is it will pass a static file when requesting to a seerver
app.use(express.static('public'));

//Socket setup
//socket.io takes a parameter which is server it is connected to
var io = socket(server);

//will listen to a event call connection
io.on('connection', function(socket){
    //socket refer to the client connect with the server
    //each client will have its own socket
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        //io.sockets refer to all the other sockets
        //and it emits the message to ther clients
        io.sockets.emit('chat',data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        //pass to other without we receive
        socket.broadcast.emit('typing', data);
    });
});
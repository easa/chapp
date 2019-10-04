const express = require('express');
const router = express.Router();
var socket = require('socket.io');

var app = express();

var server = app.listen(4000, function () {
    console.log('listing to requests on port 4000')
});


var io = socket(server);

io.on("connection", (socket) => {
    console.log('made socket connection', socket.id);

    socket.on('send-message', function (data) {
        io.in(data.room).emit('message-received', { user: data.user, message: data.message });

    });

    socket.on('join', (data) => {
        socket.join(data.room);

        console.log(data.user + 'joined the room : ' + data.room);



        socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: 'has joined this room.' });

    });
});
module.exports = io;

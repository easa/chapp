const Express = require("express");
const Http = require("http").Server(Express);
var socket = require('socket.io');

// const bodyParser = require('body-parser');

const mongoose = require('mongoose');
// const chat = require('./model/modelChat');



var app = Express();
var server = app.listen(3000,function () {
    console.log('listing to requests on port 3000')
});


app.use(Express.static('public'));

var io = socket(server);

mongoose.connect( 'mongodb://localhost:27017/chat',function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Mongo is connected ");
});

var chatSechema = mongoose.Schema({
   name : String,
    msg: String,
    created: {type:Date ,default:Date.now}
});

var Chat = mongoose.model('Message',chatSechema);
io.on('connection',function (socket) {
    console.log('made socket connection', socket.id);

    socket.on('send-message', function (data) {
        // console  .log(data.text);
        var message = new Chat({name:'not', msg:data});
        io.sockets.emit('message-received', data);
    });


//     io.on("connection" , function(socket){
//     console.log("new conection made");
//     socket.on('send-message',function(data){
//      console.log(data.text);
//     socket.emit('message-received', data);
// });
});



// Http.listen(3000,() => {
//     console.log("Listening at: 3000 ..");
// });
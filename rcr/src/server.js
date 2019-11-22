var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app)
const port = require('./config').PORT
const authHandler = require('./auth/user.server')
const chatHandler = require('./chat/chat.server')

io.on('connection', socket => {
    console.log(`socket '${socket.id}' just connected!`)
    authHandler(socket) // should be first because of adding user to socket
    chatHandler(socket)
})

app.listen(port, () => {
    console.log('connected to port : ' + port)
})

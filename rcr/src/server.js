var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app)
const port = require('./config').PORT
const authHandler = require('./auth/login.server')
const chatHandler = require('./chat/chat.server')

io.on('connection', socket => {
    console.log(`socket '${socket.id}' just connected!`)
    authHandler(socket)
    chatHandler(socket)
})

app.listen(port, () => {
    console.log('connected to port : ' + port)
})

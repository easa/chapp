var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app)
const port = require('./config').PORT
const authHandler = require('./auth/user.server')
const chatHandler = require('./chat/chat.server')

io.on('connection', socket => {
    console.log(`socket '${socket.id}' just connected!`)
    var currentuser = { mm: 'mm' }
    authHandler(socket, currentuser)
    chatHandler(socket, currentuser)
})

app.listen(port, () => {
    console.log('connected to port : ' + port)
})

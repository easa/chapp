var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app)
const port = require('./config').PORT
const authHandler = require('./auth/user.server')
const chatHandler = require('./chat/chat.server')

io.on('connection', socket => {
    console.log(`socket '${socket.id}' just connected!`)
    var secret = socket.id + 'a secret value'
    // TODO: use this secrete to encrypt users messages
    // then use jwt to validate the information user provided
    // and don't save user information on server ever!
    var currentuser = { namespace: 'socket', secret: secret } // FIXME: don't save this on server
    authHandler(socket, currentuser)
    chatHandler(socket, currentuser)
})

app.listen(port, () => {
    console.log('connected to port : ' + port)
})

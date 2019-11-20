var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app)

const port = process.env.PORT || 3231

const sockethandler = require('./sockethandler')

io.on('connection', sockethandler)

app.listen(port, () => {
    console.log('connected to port : ' + port)
})


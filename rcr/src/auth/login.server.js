const io = require('../server').io
const evt = require('../rsx/event')
const userClass = require('./userList')

module.exports = function (socket) {
	const userList = new userClass({})
	socket.on(evt.verify_user, (nickname, callback) => {
		if (!userList.exists(nickname)) return callback({ isUser: false, user: ({ name: nickname }) })
		callback({ isUser: true, user: null, list: userList.connectedUser, message: `${nickname} exists` })
	})
	socket.on(evt.user_connected, user => {
		userList.add(user)
		socket.user = user
		io.emit(evt.user_connected, userList.connectedUser)
	})
	socket.on(evt.user_disconnected, user => {
		if (!userList.exists) return 0
		socket.user = undefined
		userList.remove(user)
		io.emit(evt.user_disconnected, userList.connectedUser)
	})
	socket.on(evt.logout, (nickname, callback) => {
		if (!userList.exists(nickname)) return callback({ isUser: false, message: `${nickname} exists still` })
		userList.remove(nickname)
		socket.user = undefined
		callback({ isUser: true, userList: null, message: `${nickname} loged out` })
		io.emit(evt.user_disconnected, userList.connectedUser)
	})
}

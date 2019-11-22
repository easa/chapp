const io = require('../server').io
const evt = require('../rsx/event')
const userClass = require('./user.model')

module.exports = function (socket, currentuser) {

	socket.on(evt.verify_user, (nickname, callback) => {
		let onlineUsers = (new userClass()).find(nickname)
		if (onlineUsers) return callback({
			userList: (new userClass()).find(), error: `${nickname} already exists`
		})
		let user = new userClass(nickname)
		Object.assign(currentuser, user.toJson())
		return callback((user.name
			? { user: user.toJson() }
			: { user: undefined, error: 'name policy: start with word, can contain word, number, hyphen, atleast 4, up to 10 words!' }))
	})

	socket.on(evt.user_connected, user => {
		let _u = new userClass(user)
		socket.emit('setUser', _u.toJson())
		io.emit(evt.user_connected, new userClass().find())
	})

	socket.on(evt.user_disconnected, user => {
		if (!new userClass().find(user)) return 0
		socket.emit('setUser', undefined)
		userClass().remove(user)
		io.emit(evt.user_disconnected, new userClass().find())
	})

	socket.on(evt.logout, (nickname, callback) => {
		if (!new userClass().find(nickname)) return callback({ isUser: false, message: `${nickname} exists still` })
		new userClass().remove(nickname)
		socket.user = undefined
		callback({ isUser: true, userList: null, message: `${nickname} loged out` })
		io.emit(evt.user_disconnected, new userClass().find())
	})
}

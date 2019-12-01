const io = require('../server').io
const evt = require('../rsx/event')
// const { createMessage, createChat } = require('./factory')
const chtModel = require('./chat.model')
const msgModel = require('./message.model')
module.exports = function (socket, currentUser) {

	const chat_community = chtModel({ name: "Community", id: "Community", messages: [msgModel('Community', 'admin', `welcome to chat`)] })
	socket.on(evt.cummunity_chat, (callback) => { callback(chat_community) })

	socket.on(evt.message_sent, ({ chatId, message }) => {
		io.emit(`${evt.message_recieved}-${chatId}`, msgModel(chatId, currentUser.name, message))
	})

	socket.on(evt.typing, (chatId, isTyping) => {
		io.emit(`${evt.typing}-${chatId}`, msgModel(isTyping, currentUser.name))
	})
}

const io = require('../server').io
const evt = require('../rsx/event')
// const { createMessage, createChat } = require('./factory')
const chtModel = require('./chat.model')
const msgModel = require('./message.model')
module.exports = function (socket, currentUser) {

	socket.on(evt.message_sent, ({ chatId, message }) => sendMessage({ chatId, message }))

	// const sendTypingToChat = (sender) => (chatId, isTyping) => io.emit(`${evt.typing}-${chatId}`, createMessage({ isTyping, sender }))

	// socket.on(evt.typing, (chatId, isTyping) => { sendTypingToChat(); })

	const chat_community = chtModel({ name: "Community", id: "Community" })
	socket.on(evt.cummunity_chat, (callback) => { callback(chat_community) })

	function sendMessage({ chatId, message }) {
		io.emit(`${evt.message_recieved}-${chatId}`, msgModel(chatId, currentUser.name, message))
	}
}

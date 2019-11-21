const io = require('../server').io
const evt = require('../rsx/event')
const { createMessage, createChat } = require('./factory')

module.exports = function (socket) {
	let sendMessageToChatFromUser = {}
	const chat_community = createChat({ name: "Community" })
	const sendMessageToChat = (sender) => (chatId, msg) =>
		io.emit(`${evt.message_recieved}-${chatId}`, createMessage({ msg, sender }))
	const sendTypingToChat = (sender) => (chatId, isTyping) =>
		io.emit(`${evt.typing}-${chatId}`, createMessage({ isTyping, sender }))

	socket.on(evt.cummunity_chat, (callback) => { callback(chat_community) })
	socket.on(evt.message_sent, (chatId, msg) => sendMessageToChatFromUser(chatId, msg))
	socket.on(evt.typing, (chatId, isTyping) => { sendMessageToChat(); sendTypingToChat(); })
}

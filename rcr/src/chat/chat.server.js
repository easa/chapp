const io = require('../server').io
const evt = require('../rsx/event')
const { createMessage, createChat } = require('./factory')
const chatClass = require('./chat.model')
const msgModel = require('./message.model')
const userClass = require('../auth/user.model')
module.exports = function (socket) {

	const sendMessageToChat = (sender) => ({ chatId, message }) => {
		// FIXME: couldn't use the msgmodel or factory function.. search why
		let msg = { id: '12', text: message, sender: sender, time: '23:32' } // msgModel({ text, sender }) // createMessage({ text, sender })
		io.emit(`${evt.message_recieved}-${chatId}`, msg)
	}

	// FIXME: this current user thing is not right!
	let currentUser = (new userClass()).getCurrentUser()
	currentUser = currentUser && currentUser.name
	const sendfromuser = sendMessageToChat(currentUser)
	socket.on(evt.message_sent, (chatId, message) => sendfromuser(chatId, message))


	const sendTypingToChat = (sender) =>
		(chatId, isTyping) =>
			io.emit(`${evt.typing}-${chatId}`, createMessage({ isTyping, sender }))

	socket.on(evt.typing, (chatId, isTyping) => { sendMessageToChat(); sendTypingToChat(); })

	const chat_community = createChat({ name: "Community" })
	socket.on(evt.cummunity_chat, (callback) => { callback(chat_community) })
}

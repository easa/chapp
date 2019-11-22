import React, { Component } from 'react'
import Navbar from './navbar'
import Messages from './Messages'
import MessageInput from './messageInput'
import ChatHeading from './Headline'
import evt from '../rsx/event'

export default class ChatContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chats: [],
			activeChat: null
		}
	}
	componentDidMount() {
		const { socket } = this.props
		socket.emit(evt.cummunity_chat, this.reactChat)
	}
	reactChat = (chat) => {
		return this.addChat(chat, true)
	}
	addChat = (chat, reset) => {
		const { socket } = this.props
		const { chats } = this.state
		const newChats = reset ? [chat] : [...chats, chat]
		this.setState({ chats: newChats })
		console.log(chat.id)
		socket.on(`${evt.message_recieved}-${chat.id}`, this.addMessageToChat(chat.id))
		//socket.on(`${evt.typing}-${chat.id}`, () => this.addMessageToChat(chat.id))
	}
	addMessageToChat(chatId) {
		return message => {
			console.log('iiiiiiii')
			const { chats } = this.state
			const newChats = chats.map(chat => {
				if (chat && chat.id === chatId)
					chat.messages.push(message)
				return chat
			})
			this.setState({ chats: newChats })
		}
	}
	setActiveChat(activeChat) {
		this.setState({ activeChat })
	}
	sendMessage = (chatId, message) => {
		const { socket } = this.props
		socket.emit(evt.message_sent, { chatId, message })
	}
	setTyping = (chatId, isTyping) => {
		const { socket } = this.props
		socket.emit(evt.typing, { chatId, isTyping })
	}
	render() {
		const { user, logout } = this.props
		const { chats, activeChat } = this.state
		return (
			<div className="container">
				<ChatHeading className="header" activeChat={activeChat} />
				<Navbar chats={chats} activeChat={activeChat} setActiveChat={(a) => this.setActiveChat(a)} user={user} logout={logout} />
				<div className="chatroom">{
					activeChat == null
						? <p className="chooseAchat">choose a chat please!</p>
						: (<div>
							<Messages className="messages" messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers} />
							<MessageInput sendMessage={(message) => { this.sendMessage(activeChat.id, message) }} sendTyping={(isTyping) => { this.setTyping(activeChat.id, isTyping) }} />
						</div>)
				}</div>
			</div>
		)
	}
}

import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Messages from './Messages'
import MessageInput from './Input'
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
		socket.on(`${evt.message_recieved}-${chat.id}`, () => this.addMessageToChat(chat.id))
		socket.on(`${evt.typing}-${chat.id}`, () => this.addMessageToChat(chat.id))
	}
	addMessageToChat(chatId) {
		return message => {
			const { chats } = this.state
			const newChats = chats.map(chat => (chat.id === chatId) ? (chat.message.push(message), chat) : chat)
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
				<div className="aside">this is a box</div>
				<Sidebar chats={chats} activeChat={activeChat} setActiveChat={(a) => this.setActiveChat(a)} user={user} logout={logout} />
				<div className="chatroom">{
					activeChat == null
						? <div className="chooseAchat"><h3>choose a chat</h3></div>
						: (<div>
							<ChatHeading className="header" name={activeChat.name} /> 
							<Messages className="messages" messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers} />
							<MessageInput sendMessage={(message) => { this.sendMessage(activeChat.id, message) }} sendTyping={(isTyping) => { this.setTyping(activeChat.id, isTyping) }} />
						</div>)
				}</div>
			</div>
		)
	}
}

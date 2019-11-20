import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Messages from './Messages'
import MessageInput from './MessageInput'

export default class ChatContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chats: [],
			activeChat: null
		}
	}
	setActiveChat = (activeChat) => {
		this.setState({ activeChat })
	}
	sendMessage = (chatId, message) => {
		const { socket } = this.props
		// socket.emit(message_sent, {chatId, message})
	}
	setTyping = (chatId, isTyping) => {
		const { socket } = this.props
		// socket.emit(typing, {chatId, isTyping})
	}
	render() {
		const { user, logout } = this.props
		const { chats, activeChat } = this.state
		return (
			<div className="container">
				<div className="aside">this is a box</div>
				<Sidebar chats={chats}
					activeChat={activeChat}
					setActiveChat={this.setActiveChat}
					user={user}
					logout={logout} />
				<div className="chatroom">{
					activeChat == null ? <div></div>
						: (<div>
							<div className="header">{activeChat.name}</div>
							<Messages className="messages"
								Messages={activeChat.messages}
								user={user}
								typingUsers={activeChat.typingUsers}
							/>
							<MessageInput
								sendMessage={(message) => { this.sendMessage(activeChat.id, message) }}
								isTyping={(isTyping) => { this.setTyping(activeChat.id, isTyping)}}
							/>
						</div>)
				}</div>
			</div>
		)
	}
}

import React, { Component } from 'react'

export default class Navbar extends Component {
	render() {
		const { chats, activeChat, setActiveChat, user, logout } = this.props
		return (
			<div className="navbar">
				<div className="logout" onClick={logout}> logout </div>
				<div className="currentUser"> {user.name} </div>
				<div className="usersTable" ref="users" onClick={e => e.target === this.refs.user && setActiveChat(null)}>
					{chats.map((chat) => {
						if (!chat.name) return ''
						const lastMessage = chat.messages[chat.messages.length - 1]
						const user = (chat.user.find(name => name !== this.props.name) || { name: 'community' })
						return (
							<div key="chat.id" className={`user ${activeChat && activeChat.id === chat.id && 'active'}`}
								onClick={() => { setActiveChat(chat) }} >
								<div> {user.name} </div>
								{lastMessage && <div>{lastMessage.message}</div>}
							</div>
						)
					})}
				</div>
			</div >
		)
	}
}

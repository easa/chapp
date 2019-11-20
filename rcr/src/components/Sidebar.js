import React, { Component } from 'react'
import MdEject from './MDEject'

export default class Sidebar extends Component {
	render() {
		const { chats, activeChat, setActiveChat, user, logout } = this.props

		return (
			<div className="sidebar">
				<div>sidebar</div>
				<div className="users table"
					ref="users"
					onClick={(e) => {
						e.target === this.refs.user && setActiveChat(null)
					}}>{
						chats.map((chat) => {
							if (!chat.name) return null
							const lastMessage = chat.messages[chat.messages.length - 1]
							const user = chat.user.find(({ name }) => {
								return name !== this.props.name
							}) || { name: 'community' }
							return (
								<div key="chat.id"
									className={`user ${activeChat.id === chat.id ? 'active' : ''}`}
									onClick={() => { setActiveChat(chat.id) }} >
									<div>{user.name} </div>
									{lastMessage && <div>{lastMessage.message}</div>}
								</div>
							)
						})
					}</div>
				<div className="currentuser">
					<div>{user.name}</div>
					<div onClick={() => { logout() }}>logout <MdEject /></div>
				</div>
			</div >
		)
	}
}

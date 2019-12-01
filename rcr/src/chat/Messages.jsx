import React, { Component } from 'react'

export default class Messages extends Component {
	constructor(props) {
		super(props)
		this.scrollDown = this.scrollDown.bind(this)
	}
	scrollDown() {
	  this.refs.scrollTop = this.refs.scrollHeight
	}
	componentDidMount() {
		this.scrollDown()
	}
	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	render() {
		const { messages, user, typingUsers } = this.props
		return (
			<div className="container">
				<div className="thread">{
					messages.map(msg => msg ? <div key={msg.id} className={`msg ${msg.sender === user.name ? 'right' : ''}`}>
						<div className="name">{msg.sender}</div>
						<div className="text">{msg.text}</div>
						<div className="time">{msg.time}</div>
					</div> : <div>ERROR</div>)
				}{typingUsers.map(name =>
					<div key={name} className="right">{`${name} is typing...`}</div>
				)}</div>
			</div>
		)
	}
}

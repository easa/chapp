import React, { Component } from 'react'

export default class Messages extends Component {
	constructor(props) {
		super(props)
		this.scrollDown = this.scrollDown.bind(this)
	}
	scrollDown() {
		// this.refs.scrollTop = this.refs.scrollHeight
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
					messages.map(mes => <div key={mes.id} className={`mc ${mes.sender === user.name && 'right'}`}>
						<div className="name">{mes.sender}</div>
						<div className="message">{mes.message}</div>
						<div className="time">{mes.time}</div>
						<div className="tick"></div>
					</div>)
				}{typingUsers.map(name =>
					<div key={name} className="typingUser">{`${name} is typing...`}</div>
				)}</div>
			</div>
		)
	}
}

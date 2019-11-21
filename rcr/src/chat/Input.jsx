import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MessageInput extends Component {
  static propTypes = {
    prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      isTyping: false
    }
  }
  stopCheckingTyping() {
    if (!this.typingInterval) return 0
    clearInterval(this.typingInterval)
    this.props.sendTyping(false)
  }
  startCheckingTyping() {
    this.typingInterval = setInterval(() => {
      if ((Date.now() - this.lastupdate) < 500) return 0
      this.setState({ isTyping: false })
      this.stopCheckingTyping()
    }, 500);
  }
  sendTyping = e => {
    this.lastupdate = Date.now()
    if (this.state.isTyping) return 0
    this.setState({ isTyping: true })
    this.props.sendTyping(true)
    this.startCheckingTyping()
  }
  sendMessage = e => {
    this.props.sendMessage(this.state.message)
  }
  submit = e => {
    e.preventDefault()
    this.sendMessage()
    this.setstate({ message: '' })
  }
  componentWillUnmount() {
    this.stopCheckingTyping()
  }
  render() {
    const { message } = this.state
    return (
      <div className="inputBox">
        <form onSubmit={this.submit}>
          <input value={message} ref={'messageinput'} type="text" autoComplete={'off'} placeholder="type message..."
            onKeyUp={e => e.keyCode !== 13 && this.sendTyping()}
            onChange={target => this.setState({ message: target.value })} />
          <button type="submit" disabled={() => message.length < 1}>send</button>
        </form>
      </div >
    )
  }
}

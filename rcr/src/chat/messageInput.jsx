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
  stopCheckingTyping = () => {
    if (!this.typingInterval) return 0
    clearInterval(this.typingInterval)
    this.props.sendTyping(false)
  }
  startCheckingTyping = () => {
    this.typingInterval = setInterval(() => {
      if ((Date.now() - this.lastupdate) < 500) return 0
      this.setState({ isTyping: false })
      this.stopCheckingTyping()
    }, 500);
  }
  sendTyping = () => {
    this.lastupdate = Date.now()
    if (this.state.isTyping) this.setState({ isTyping: true })
    this.props.sendTyping(true)
    this.startCheckingTyping()
  }
  sendMessage = (msg) => {
    this.props.sendMessage(msg)
  }
  submit = e => {
    e.preventDefault()
    if (this.state.message.length < 1) return 0
    this.sendMessage(this.state.message)
    this.setState({ message: '' })
  }
  componentWillUnmount() {
    this.stopCheckingTyping()
  }
  render() {
    let { message } = this.state
    return (
      <div className="inputBox">
        <form onSubmit={this.submit}>
          <input value={message} ref={'messageinput'} type="text" autoComplete={'off'} placeholder="type message..."
            onKeyUp={e => e.keyCode !== 13 && this.sendTyping()}
            onChange={e => { this.setState({ message: e.target.value }) }} />
          <button type="submit" onClick={this.submit} disabled={() => message.length < 1}>send</button>
        </form>
      </div >
    )
  }
}

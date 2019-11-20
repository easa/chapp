import React, { Component } from 'react'
const evt = require('../event')
export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: ""
            , error: ""
        }
    }
    setError = (msg) => {
        this.setState({ msg })
    }
    setUser = ({ user, isUser }) => {
        console.log(user, isUser)
        if (isUser) {
            this.setError('user exists!')
        } else {
            this.props.setUser(user)
        }
    }

    handleChange = (e) => {
        this.setState({ nickname: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { socket } = this.props
        const { nickname } = this.state
        socket.emit(evt.verify_user, nickname, this.setUser)
    }
    render() {
        const { nickname, error } = this.state
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="loginform">
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input ref={(input) => { this.textInput = input }}
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder={'MYcoolUsername'} />
                </form>
                <div>{this.state.msg}</div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import evt from '../rsx/event'
export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = { nickname: "", error: "" }
    }
    setError = msg => this.setState({ msg })
    setUser = ({ error, user, userList }) => {
        if (error) this.setError(error)
        else this.props.setUser(user)
    }
    login = (e) => {
        e.preventDefault()
        const { socket } = this.props
        const { nickname } = this.state
        socket.emit(evt.verify_user, nickname, this.setUser)
    }
    // onSubmit={this.login}
    render() {
        const { nickname } = this.state
        return (
            <div className="login">
                <div>{this.state.msg}</div>
                <br />
                <form onSubmit={this.login} className="loginform">
                    <label htmlFor="nickname">
                        <h2>pick a nickname?</h2>
                    </label>
                    <input ref={(input) => { this.textInput = input }}
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={e => this.setState({ nickname: e.target.value })}
                        placeholder={'nickname...'} />
                    <br /><button type="submit" onClick={this.login}>login</button>
                </form>
            </div>
        )
    }
}

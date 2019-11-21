import React, { Component } from 'react'
import LoginForm from "./auth/LoginForm"
import ChatContainer from './chat'

import io from 'socket.io-client'
const socketUrl = require('./config').socketURL

const evt = require('./rsx/event')

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            user: null
        }
    }
    componentWillMount() {
        this.initsocket();
    }
    initsocket = () => {
        const socket = io(socketUrl)
        this.setState({ socket })
        socket.on('connect', () => {
            console.log(`${socket.id} just connected`)
        })
    }
    setUser = (user) => { // set the user in state
        const { socket } = this.state
        socket.emit(evt.user_connected, (e) => { console.log(e.message) })
        this.setState({ user })
    }
    logout = () => { // set state's user to nulll
        const { socket } = this.state
        socket.emit(evt.logout, this.state.user.name, (e) => { console.log(e.message) })
        this.setState({ user: null })
    }
    render() {
        const { title } = this.props
        const { socket, user } = this.state
        return (
            <div className="container">
                {title}
                {!user
                    ? <LoginForm socket={socket} setUser={this.setUser} />
                    : <ChatContainer socket={socket} user={user} logout={this.logout} />
                }
            </div>
        )
    }
}

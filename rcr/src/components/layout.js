import React, { Component } from 'react'
import io from 'socket.io-client'
import { copyFile } from 'fs';
import LoginForm from "./LoginForm"
import { callbackify } from 'util';
import ChatContainer from './ChatContainer'

const socketUrl = "http://localhost:3231/"
const evt = require('../event')
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
            console.log('connected')
        })
    }

    // set the user in state
    setUser = (user) => {
        const { socket } = this.state
        socket.emit(evt.user_connected)
        this.setState({ user })
    }
    // set state's user to nulll
    logout = () => {
        const { socket } = this.state
        socket.emit(evt.logout)
        this.setState({ user: null })
    }
    render() {
        const { title } = this.props
        const { socket, user } = this.state
        return (
            <div className="container">{
                !user
                    ? <LoginForm socket={socket} setUser={this.setUser} />
                    : <ChatContainer socket={socket} user={user} logout={this.logout} />
            }</div>
        )
    }
}

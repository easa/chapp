const uuidv4 = require('uuid/v4');

const createUser = ({ name = '' } = {}) => ({ id: uuidv4(), name })

const createMessage = ({ text = "", sender = "" }) => {
    console.log('hi', text, sender)
    return ({ id: uuidv4(), time: getTime(new Date(Date.now())), text, sender })
}

const createChat = ({ messages = [], name = '', user = [] }) =>
    ({ id: uuidv4(), name, messages, user, typingUsers: [] })

const getTime = date => `${date.getHours()}:${date.getMinutes().slice && date.getMinutes().slice(-2)}`

module.exports = {
    createChat,
    createMessage,
    createUser,
}
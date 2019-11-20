

const uuidv4 = require('uuid/v4');

const createUser = ({ name = '' } = {}) => {
    return {
        id: uuidv4(),
        name
    } 
}

const createMessage = ({ message = "", sender = "" } = {}) => {
    return {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
}

const createChat = ({ messages = [], name = "Community", users = [] } = {}) => {
    return {
        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers: []
    }
}

const getTime = (date) => `${date.getHours()}:${date.getMinutes().slice(-2)}`



module.exports = {
    createChat,
    createMessage,
    createUser
}
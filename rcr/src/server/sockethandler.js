const io = require('./index').io

const evt = require('../event')

const connectedUser = {}

const { createUser } = require('../factory')

module.exports = function (socket) {
    console.log('socket id = ' + socket.id)

    // verify username
    socket.on(evt.verify_user, (nickname, callback) => {
        if (isUser(connectedUser, nickname)) {
            console.log('user exists')
            callback({ isUser: true, user: null })
        } else {
            console.log('user not here exists')

            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
    })
    // user connects with username
    // user discunnect
    // user logout
}

function addUser(userList, user) {
    let newlist = Object.assign({}, userList)
    newlist[user.name] = user
    return newlist
}

function removeUser(userList, username) {
    let newlist = Object.assign({}, userList)
    delete newlist[username]
    return newlist
}
function isUser(userList, username = '') {
    //FIXME: this assignment shan't be here
    return (username in userList) ? true : (connectedUser[username] = 1, false)

}
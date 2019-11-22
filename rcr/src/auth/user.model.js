const uuidv4 = require('uuid/v4');
let userList = []
let currentUser = undefined
module.exports = user
function userProto() {
  this.toJson = function () {
    var name = this.name, id = this.id, loginDate = this.loginDate
    return { name, id, loginDate }
  }
  this.find = function (options) {
    if (!options) return userList
    if (typeof options === 'string')
      return userList.find(u => u && u.name === options)
    var condisions = []
    Object.keys(options).forEach(k => { condisions.push((k, list) => list[k] === options[k]) })
    return userList.find(u => condisions.reduce((result, curr) => {
      if (!condisions[curr](u, userList)) result = false
      return result
    }, true))
  }
  this.remove = function (options) {
    let item = this.find(options)
    let idx = userList.indexOf(item)
    delete userList[idx]
    currentUser = undefined
  }
  this.getCurrentUser = function () { return currentUser }
}
function user(nickname) {
  if (!nickname || typeof nickname !== 'string'
    || !nickname.match(/^\w[\w_-\d]{3,9}$/gi)) return undefined
  this.name = nickname
  this.id = uuidv4()
  this.loginDate = new Date()
  userList.push(this.toJson())
  currentUser = this.toJson()
  return this
}
user.prototype = new userProto()

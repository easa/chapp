class userClass {
  constructor(cu) {
    this.connectedUser = cu || {}
  }
  add(user) {
    this.connectedUser[user.name] = user
    return this.connectedUser
  }
  remove(username) {
    delete this.connectedUser[username]
    return this.connectedUser
  }
  exists(username = '') {
    return (username in this.connectedUser)
      ? true
      : (this.connectedUser[username] += 1, false)
  }
}
module.exports = userClass
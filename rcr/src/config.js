function app() {
  this.PORT = 3001
  this.socketURL = `http://localhost:${this.PORT}`
}
module.exports = new app()
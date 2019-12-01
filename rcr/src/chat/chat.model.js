const uuidv4 = require('uuid/v4');

module.exports = ({ name, id = uuidv4, messages = [], users = [], typingUsers = [] }) => {
  let chat = { id, name, messages, users, typingUsers }
  if (!name || typeof name !== 'string') return undefined
  return chat

}

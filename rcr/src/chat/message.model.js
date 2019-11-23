const uuidv4 = require('uuid/v4');

module.exports = (chatId, sender, text) => {
  let now = new Date()
  let datetime = `${now.getHours()}:${now.getMinutes()}`
  let msg = { id: uuidv4(), chatId, text, sender, time: datetime }
  if (!text || typeof text !== 'string') return undefined
  return msg
}

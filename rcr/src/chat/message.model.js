const uuidv4 = require('uuid/v4');
module.exports = (text, sender) => {
  console.log(this.arguments)
  console.log('ddddddddddd', text, sender)
  if (!text || typeof text !== 'string') return undefined
  return {
    text,
    id: uuidv4(),
    sentDate: new Date(),
    sender
  }
}

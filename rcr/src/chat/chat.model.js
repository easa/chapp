const uuidv4 = require('uuid/v4');
module.exports = chat
function chat(title) {
  if (!title || typeof title !== 'string'
    || !title.match(/^\w[\w_-\d]{3,9}$/gi)) return undefined
  return {
    title,
    id: uuidv4(),
    sentDate: new Date()
  }
}

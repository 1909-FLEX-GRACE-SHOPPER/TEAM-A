const bcrypt = require('bcrypt')

//utility functions for server

//generate the sessionId
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const hasher = (itemToHash) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(itemToHash, salt);
  return hash;
}

const compare = (item, hash) => {
  return bcrypt.compareSync(item, hash)
}

module.exports = {
  generateSessionId,
  hasher,
  compare
}
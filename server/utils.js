const bcrypt = require('bcrypt')
const { categoriesObj } = require('../constants')

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

const categorize = item => {
  for (let key in categoriesObj) {
    if (categoriesObj[key].includes(item)) return key;
  }
}

module.exports = {
  generateSessionId,
  hasher,
  compare,
  categorize
}
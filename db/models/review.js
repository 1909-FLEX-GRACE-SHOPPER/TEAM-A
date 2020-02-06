const Sequelize = require('sequelize')
const connection = require('../connection')

const Review = connection.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 500]
    }
  },
})

module.exports = Review
const Sequelize = require('sequelize')
const connection = require('../connection')

//Review belongsTo Product
//Product hasMany Review

const Review = connection.define('review', {
  review: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 500]
    },
    defaultValue: 'Product review'
  },
  rating: {
    type: Sequelize.DECIMAL(3, 2),
    validate: {
      min: .01,
      max: 5.0
    }
  },

})

module.exports = Review
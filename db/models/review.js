const Sequelize = require('sequelize')
const connection = require('../connection')

//Review belongsTo Product
//Product hasMany Review

const Review = connection.define('review', {
    review: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 500]
        }
    },
    rating: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        validate: {
            isNumeric: true,
            isDecimal: true,
            min: .01,
            max: 5.0
        }
    },

})

module.exports = Review
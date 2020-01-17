const Sequelize = require('sequelize');
const connection = require('../connection');

const Price = connection.define('price', {
    value: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false,
        validate: {
            isNumeric: true,
            isDecimal: true,
            min: 0.99,
            max: 9999.99
        }
    }
})

module.exports = Price;
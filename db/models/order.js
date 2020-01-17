const Sequelize = require('sequelize');
const connection = require('../connection');

const Order = connection.define('order', {
    status: {
        type: Sequelize.ENUM('pending', 'fulfilled', 'shipped', 'delivered'),
        defaultValue: 'pending',
        allowNull: false,
    },
    total: {
        type: Sequelize.DECIMAL(8, 2),
        defaultValue: 0.00,
        allowNull: false,
        validate: {
            isNumeric: true,
            isDecimal: true,
            min: 0.99,
            max: 999999.99
        }
    }
})

module.exports = Order;
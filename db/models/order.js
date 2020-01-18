const Sequelize = require('sequelize');
const connection = require('../connection');

const Order = connection.define('order', {
    status: {
        type: Sequelize.ENUM('pending', 'fulfilled', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false,
    }
})

module.exports = Order;
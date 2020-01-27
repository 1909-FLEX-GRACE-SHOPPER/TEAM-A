const Sequelize = require('sequelize');
const connection = require('../connection');

const Order = connection.define('order', {
    status: {
        type: Sequelize.ENUM('cart', 'pending', 'fulfilled', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'cart',
        allowNull: false,
    },
})

module.exports = Order;
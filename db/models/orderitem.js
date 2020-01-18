const Sequelize = require('sequelize');
const connection = require('../connection');

const OrderItem = connection.define('orderitem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: {
            max: 99,
            min: 1,
        }
    },
    pricePaid: {
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

module.exports = OrderItem;
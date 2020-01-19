const Sequelize = require('sequelize');
const connection = require('../connection');

const CartItem = connection.define('cartitem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: {
            max: 99,
            min: 1,
        }
    }
});

module.exports = CartItem;
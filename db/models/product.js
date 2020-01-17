const Sequelize = require('sequelize');
const connection = require('../connection');

const Product = connection.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'product name',
        validate: {
            notEmpty: true,
            len: [1, 250],
        }
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: '',
        validate: {
            len: [0, 500],
        }
    },
    inventory: {
        type: Sequelize.INTEGER,
        defaultValue: 5000,
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 0,
            max: 5000,
        }
    },
})

module.exports = Product;
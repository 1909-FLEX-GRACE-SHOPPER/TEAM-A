const Sequelize = require('sequelize');
const connection = require('../connection');

const User = connection.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    name: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('cannot SET name');
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'guest@guest.com',
        validate: {
            notEmpty: true,
            isEmail: true,
            isUnique: true,
            required: true,
        },
    },
    hashedPassword: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            required: true,
        },
    },
    isRegistered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
})

module.exports = User;


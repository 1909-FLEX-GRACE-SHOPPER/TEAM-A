const Sequelize = require('sequelize');
const connection = require('../connection');

const Session = connection.define('session', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    }
});

module.exports = Session;
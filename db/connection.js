const Sequelize = require('sequelize');

const PORT = process.env.PORT || 5432;
const localDB = `postgres://localhost:${PORT}/graceshopper`;

//Looking for the connection string for the cloud database.
//If you don't have this, comment this below line:
//const { cloudDB } = require('../secrets');

const connection = new Sequelize(
    process.env.DATABASE_URL || localDB,
    { logging: false}
);

module.exports = connection;

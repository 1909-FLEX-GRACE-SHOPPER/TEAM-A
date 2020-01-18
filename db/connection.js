const Sequelize = require('sequelize');

const PORT = process.env.PORT || 5432;
const localDB = `postgres://localhost:${PORT}/graceshopper`;

const connection = new Sequelize(
    process.env.DATABASE_URL || localDB,
    { logging: false}
);

module.exports = connection;

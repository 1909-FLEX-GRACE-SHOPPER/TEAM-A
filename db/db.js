const Sequelize = require('sequelize');
const chalk = require('chalk');

const PORT = process.env.PORT || 5432;
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:${PORT}/graceshopper`);

module.exports = db;
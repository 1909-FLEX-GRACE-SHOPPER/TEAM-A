const Sequelize = require('sequelize');

const PORT = process.env.PORT || 5432;
const localDB = `postgres://localhost:${PORT}/graceshopper`;
const testDB = `postgres://localhost:${PORT}/graceshopper_test`
let dbString;

if (process.env.NODE_ENV === 'test') {
    //unsure how to create test db for travis
    dbString = process.env.DATABASE_URL || testDB

} else {
    dbString = process.env.DATABASE_URL || localDB
}

const connection = new Sequelize(dbString, { logging: false })

// const connection = new Sequelize(
//     process.env.DATABASE_URL || localDB,
//     { logging: false }
// );

module.exports = connection;

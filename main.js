const Sequelize = require('sequelize');
const chalk = require('chalk');

const db = require('./db/db');

//module.exports = db;
const User = db.define('user', {
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
  }
})

console.log(chalk.blue('Opening database connection'));
db.sync({ force: true })
  .then(() => {
    console.log(chalk.green('database sync successful'))
  })

const chalk = require('chalk');
const { connection } = require('./db');

console.log(chalk.white('*** FILE: main.js'));

console.log(chalk.white('Opening database connection'));

connection.sync()
  .then(() => {
    console.log(chalk.green('database sync successful'))
  })
  .catch(e => {
      console.log(chalk.red('database sync failed'));
      console.error(e);
  })

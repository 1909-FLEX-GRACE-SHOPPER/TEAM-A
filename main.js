const dotenv = require('dotenv');
dotenv.config();
const chalk = require('chalk');
const { connection } = require('./db');
const server = require('./server');
const PORT = process.env.PORT || 3000;


console.log(chalk.white('*** FILE: main.js'));
console.log(chalk.white('Opening database connection'));

connection.sync()
  .then(() => {
    console.log(chalk.green('Database sync successful'));
    server.listen(PORT, () => {
      console.log(chalk.greenBright(`Server listening on ${PORT}`));
    })
  })
  .catch(e => {
      console.log(chalk.red('Database sync failed'));
      console.error(e);
  })

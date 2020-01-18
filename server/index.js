const express = require('express');
const path = require('path');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');

const server = express();

//middleware here
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
server.use(cookieParser());

//authentication here
//TODO: WRITE AUTHENTICATION ROUTING

//routing here
server.use('/api', require('./api'));

//main route to serve index.html
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

//error handling
server.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(chalk.red('Error in server request'));
        console.error(chalk.white(err.stack));
    }
    res.status(err.status || 500).send(err.message || 'Internal server error');
})

module.exports = server;

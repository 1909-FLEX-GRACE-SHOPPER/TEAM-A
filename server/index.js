const express = require('express');
const path = require('path');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const { User } = require('../db');

const server = express();

//middleware here
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
server.use(cookieParser());

//check for cookie, set user based on sessionId
server.use((req, res, next) => {
    if (req.cookies.sessionId) {
        User.findOne({
            where: {
                sessionId: req.cookies.sessionId
            }
        })
        .then(user => {
            if (user) {
                req.loggedIn = true;
                req.user = user;
                req.guest = !user.isRegistered;
            }
            next();
        })
        .catch(e => {
            console.log(chalk.red('Error retrieving sessionId'));
            console.error(e);
            next(e);
        })
    }
    else {
        next();
    }
});

//routing here
server.use('/api', require('./api'));
server.use('/auth', require('./auth'));

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

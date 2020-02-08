const express = require('express');
const path = require('path');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const { User, Session } = require('../db');
const moment = require('moment');
const APIRouter = require('./api');
const authRouter = require('./auth');
const volleyball = require('volleyball');


const server = express();

//middleware here
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));
const debug = process.env.NODE_ENV === 'test';
server.use(volleyball.custom({ debug }));
server.use(cookieParser());

//check for cookie, set user based on sessionId
server.use((req, res, next) => {
  if (req.cookies.sessionId) {
    User.findOne({
      where: {
        sessionId: req.cookies.sessionId,
      },
    })
      .then(foundUser => {
        if (foundUser) {
          req.user = foundUser;
        }
        next();
      })
      .catch(e => {
        console.log(chalk.red('Error retrieving sessionId'));
        console.error(e);
        next(e);
      });
  } else {
    Session.create()
      .then(newSession => {
        res.cookie('sessionId', newSession.id, {
          path: '/',
          expires: moment
            .utc()
            .add(1, 'day')
            .toDate(),
        });
        next();
      })
      .catch(e => {
        console.log(chalk.red('Error creating session'));
        console.error(e);
        next(e);
      });
  }
});

//routing here
server.use('/api', APIRouter);
server.use('/auth', authRouter);

//main route to serve index.html
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//error handling
server.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(chalk.red('Error in server request'));
    console.error(chalk.white(err.stack));
  }
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = server;

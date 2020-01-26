var express = require('express');
var router = express.Router();
const chalk = require('chalk');
const { User, Cart, Order } = require('../../db');
const { generateSessionId, hasher } = require('../utils');
// const bcrypt = require('bcrypt')

//return a single user by id
//includes cart and orders
router.get('/:userId', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userId,
    },
    include: [
      {
        model: Cart,
      },
      {
        model: Order,
      }
    ]
  })
    .then(result => {
      if (result) {
        return res.status(200).send(result);
      }
      res.status(404).send('Not found');
    })
    .catch(e => {
      console.log(chalk.red(`Error in GET /api/user/id: ${req.url}`));
      res.status(400).send('Invalid request');
      next(e);
    })
});

//return all users with optional sorting parameters
//does not include any associated models
//example 1: /api/user
//example 2: /api/user?sort=firstName&dir=ASC
router.get('/', (req, res, next) => {
  User.findAll({
    order: [
      [req.query.sort || 'lastName', req.query.dir || 'ASC']
    ],
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      console.log(chalk.red(`Error in GET /api/user: ${req.url}`));
      res.status(400).send('Invalid request');
      next(e);
    })
});

//update a user
//Converting guest user to singed up user, the only field that CANNOT be updated is the sessionId
router.put('/:userId', (req, res, next) => {
  User.update(
    {
      sessionId: req.body.sessionId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hasher(req.body.password),
      isRegistered: true,
    },
    {
      where: {
        id: req.params.userId
      },
      returning: true,
    }
  )
    .then(updated => {
      console.log("updated[0]===>", updated[0])
      console.log("updated[1]===>", updated[1])
      if (updated[0]) {
        return res.status(200).send(updated[1]);
      }
      res.status(404).send('Not found');
    })
    .catch(e => {
      console.log(chalk.red(`Error in PUT /api/user/id: ${req.url}`));
      res.status(400).send('Invalid request');
      next(e);
    })
});

//special post method for creating a guest user
//generates a user random string email and hashed password,
//returns said user with sessionId
router.post('/guest', (req, res, next) => {
  //todo: replace this function with something more secure
  const sessionId = generateSessionId();
  User.create({
    firstName: 'guest',
    lastName: 'guest',
    email: `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@guest.com`,
    password: hasher(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
    isRegistered: false,
    sessionId,
  })
    .then(created => {
      res.status(201).send(created);
    })
    .catch(e => {
      console.log(chalk.red(`Error in POST /api/user/guest: ${req.url}`));
      res.status(400).send('Invalid request');
      next(e);
    })
});

router.post('/', (req, res, next) => {
  const sessionId = generateSessionId();
  //TODO: HASH PASSWORD ON FRONTEND

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hasher(req.body.password),
    isRegistered: true,
    sessionId,
  })
    .then(created => {
      res.status(201).send(created);
    })
    .catch(e => {
      console.log(chalk.red(`Error in POST /api/user/guest: ${req.body}`));
      res.status(400).send('Invalid request');
      next(e);
    })
});

module.exports = router;
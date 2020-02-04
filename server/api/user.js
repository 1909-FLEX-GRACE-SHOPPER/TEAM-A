var express = require('express');
var router = express.Router();
const chalk = require('chalk');
const { User, Cart, Order } = require('../../db');
const { generateSessionId, hasher } = require('../utils');

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
        include: [{
          model: CartItem,
          include: {
            model: Product,
            include: [
              {
                model: Review,
              }
            ]
          }
        }
        ]
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
//right now, the only field that can be updated is the sessionId
router.put('/:userId', (req, res, next) => {
  User.update(
    {
      sessionId: req.body.sessionId
    },
    {
      where: {
        id: req.params.userId
      },
      returning: true,
    }
  )
    .then(updated => {
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

router.post('/', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(foundUser => {
      if (foundUser) {
        res.status(400).send('Email already exists, please login or use different email to signup.')
      } else {
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hasher(req.body.password),
          isRegistered: true,
          sessionId: req.cookies && req.cookies.sessionId
        })
          .then(created => {
            res.status(201).send(created);
          })
          .catch(e => {
            console.log(chalk.red(`Error in POST /api/user/: ${req.body}`));
            res.status(400).send('Invalid request');
            next(e);
          })
      }
    })
    .catch(e => {
      console.log(chalk.red(`Error in POST /api/user/: ${req.body}`));
      res.status(400).send('Invalid request');
      next(e);
    })

});

module.exports = router;
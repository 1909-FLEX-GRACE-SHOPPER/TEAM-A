const express = require('express');
const { User, Session } = require('../../db');
const { generateSessionId, compare } = require('../utils')

const router = express.Router();

//POST for submitting a user's login email and password;
router.post('/', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(foundUser => {
      if (foundUser && req.body.password == foundUser.password) {
        User.update(
          {
            sessionId: req.cookies.sessionId
          },
          {
            where: {
              id: foundUser.id
            }
          }
        )
        res.status(202).send(foundUser);
      }
      else {
        res.status(400).send('Pasword does not match')
      }
    })
    .catch(e => {
      res.status(404).send('User not found')
    })
});

module.exports = router;


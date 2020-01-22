var express = require('express');
var router = express.Router();
const { User } = require('../../db');
const { generateSessionId, compare } = require('../utils')
const moment = require('moment')

router.use(express.json());

//POST for submitting a user's login email and password;
router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then(user => {
      if (password == user.hashedPassword) {
        user.update({ ...user, sessionId: generateSessionId() }, { returning: true })
          .then(updatedUser => {
            res.cookie('sessionId', updatedUser.sessionId, {
              path: '/',
              expires: moment.utc().add(1, 'day').toDate(),
            })
            res.status(202).send('Success logging in!')
          })
      } else {
        res.status(400).send('Pasword does not match')
      }
    })
    .catch(e => {
      res.status(404).send('User not found')
    })
});


module.exports = router;


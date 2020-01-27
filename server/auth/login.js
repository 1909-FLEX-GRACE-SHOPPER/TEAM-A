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
      if (password == user.password) {
        let newSessionId = generateSessionId();
        user.update({ sessionId: newSessionId }, { returning: true })
          .then(updatedUser => {
            res.cookie('sessionId', updatedUser.sessionId, {
              path: '/',
              expires: moment.utc().add(1, 'day').toDate(),
            })
            res.status(202).send(updatedUser)
          })
      } else {
        res.status(400).send('Pasword does not match')
      }
    })
    .catch(e => {
      res.status(404).send('User not found')
    })
});

router.put('/', (req, res, next) => {
  const { logout } = req.body;
  if (logout) {
    res.clearCookie("sessionId");
    res.status(200).send();
  }
})


module.exports = router;


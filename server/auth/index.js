const express = require('express');

const router = express.Router();

//add additional routes here
router.use('/who', require('./who'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));

//error handling
router.use((req, res, next) => {
  const err = new Error(`Invalid auth path: ${req}`);
  err.status = 404;
  next(err)
})

module.exports = router;
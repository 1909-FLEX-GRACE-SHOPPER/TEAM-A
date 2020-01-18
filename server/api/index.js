const express = require('express');

const router = express.Router();

//router.use('/order', require('./order'));
//add additional routes here

//router.use('/cart', require('./cart'))

router.use('/products', require('./products'))

//error handling
router.use((req, res, next) => {
  const err = new Error(`Invalid API path: ${req.baseUrl}`);
  err.status = 404;
  next(err)
})

module.exports = router;

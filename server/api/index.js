const express = require('express');

const router = express.Router();

//add additional routes here
router.use('/orders', require('./order'));
router.use('/orderitems', require('./orderitem'));

router.use('/cartitem', require('./cartitem'))
router.use('/cart', require('./cart'))

router.use('/products', require('./products'))

//error handling
router.use((req, res, next) => {
  const err = new Error(`Invalid API path: ${req}`);
  err.status = 404;
  next(err)
})

module.exports = router;

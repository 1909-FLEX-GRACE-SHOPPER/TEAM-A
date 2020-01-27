const express = require('express');

const router = express.Router();

router.use(express.json());

//add additional routes here
router.use('/order', require('./order'));
router.use('/orderitem', require('./orderitem'));
router.use('/user', require('./user'));
router.use('/cartitem', require('./cartitem'))
router.use('/cart', require('./cart'))
router.use('/shippingaddress', require('./shippingAddress'))
router.use('/products', require('./products'))

//error handling
router.use((req, res, next) => {
  const err = new Error(`Invalid API path: ${req.originalUrl}`);
  err.status = 404;
  next(err)
})

module.exports = router;
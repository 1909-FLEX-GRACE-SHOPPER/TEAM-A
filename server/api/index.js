const router = require('express').Router()

//API Routes go here

router.use('/cart', require('./cart.js'))

// router.use('/cartItem', require('./cartItem.js'))

// router.use('/orders', require('./order.js'))

// router.use('/orderItem', require('./orderItem.js'))

// router.use('/product', require('./product.js'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router

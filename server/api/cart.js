const Sequelize = require('sequelize');
const router = require('express').Router()
const { Cart, CartItem, User } = require('../../db')

// CART: (/api/cart)
// create new cart (POST - '/') - use userId (new cart should be created as soon as new user enters app)

router.post('/', (req, res, next) => {
  if (req.user) {
    Cart.create({ userId: req.user.id , sessionId: req.cookies.sessionId })
    .then(() => {
      Cart.findOne({ where: { sessionId: req.cookies.sessionId }, include: { model: CartItem } })
        .then((newCart) => res.status(201).send(newCart))
        .catch(e => {
          res.status(400).send('Error creating new cart!')
          next(e)
        })
    })
  } else {
      Cart.create({ sessionId: req.cookies.sessionId })
      .then(() => {
        Cart.findOne({ where: { sessionId: req.cookies.sessionId }, include: { model: CartItem } })
        .then((newCart) => res.status(201).send(newCart))
          .catch(e => {
            res.status(400).send('Error creating new cart!')
            next(e)
          })
    })
  }
});

// retrieve single cart, or all carts (GET - '/:cartId?')

router.get('/:cartId?', (req, res, next) => {
  const { cartId } = req.params;
  if (cartId) {
    Cart.findOne({ where: { id: parseInt(cartId) }, include: { model: CartItem } })
      .then(cart => res.send(cart))
      .catch(e => {
        res.status(404).send('Cart not found!')
        next(e)
      })
  } else {
    Cart.findAll({ include: { model: CartItem } })
      .then(carts => res.status(302).send(carts))
      .catch(e => {
        res.status(404).send('Error finding all carts')
        next(e)
      })
  }
})

// retrieve single cart by userId

router.get('/byuser/:userId', (req, res, next) => {
  const { userId } = req.params;
  Cart.findOne({ where: { userId }, include: { model: CartItem } })
    .then(cart => res.send(cart))
    .catch(e => {
      res.status(404).send('Cart not found by userId!')
        .next(e)
    })
})

// clear cart (PUT - '/:cartId')

router.put('/:cartId', (req, res, next) => {
  const { cartId } = req.params;
  CartItem.destroy({ where: { cartId } })
    .then(() => {
      Cart.findOne({ where: { cartId } })
        .then(clearedCart => res.send(clearedCart))
        .catch(() => res.send('Error finding cart'))
    })
    .catch(e => {
      res.status(400).send('Error destroying cart');
      next(e);
    })
})

module.exports = router;
const router = require('express').Router()
const { Cart, CartItem, User } = require('.../db/models')

// CART: (/api/cart)
// create new cart (POST - '/') - use userId (new cart should be created as soon as new user enters app)

router.post('/', (req, res, next) => {
  const { userId } = req.body;
  Cart.create({ userId })
    .then(() => {
      Cart.findOne({ where: { userId }, include: { model: User } })
        .then(cart => res.status(201).send(cart))
        .catch(() => res.status(404).send('Error finding new cart'))
    })
    .catch(e => {
      res.status(400).send('Error creating new cart!')
      next(e)
    })
})

// retrieve single cart, or all carts (GET - '/:cartId?')

router.get('/:cartId?', (req, res, next) => {
  const { cartId } = req.params;
  if (cartId) {
    Cart.findOne({ where: { id: cartId }, include: { model: User } })
      .then(cart => res.status(302).send(cart))
      .catch(e => {
        res.status(404).send('Cart not found!')
        next(e)
      })
  } else {
    Cart.findAll({ include: { model: User } })
      .then(carts => res.status(302).send(carts))
      .catch(e => {
        res.status(404).send('Error finding all carts')
        next(e)
      })
  }
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

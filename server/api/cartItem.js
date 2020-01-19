const Sequelize = require('sequelize');
const router = require('express').Router()
const { Cart, CartItem, User, Product } = require('../../db/models')

// CART-ITEM: (/api/cartItem)
// add to cart (POST - '/') - creates new CartItem, uses productId of selected product, cartId

router.post('/', (req, res, next) => {
  const { cartId, productId, quantity } = req.body;
  CartItem.create({ cartId, productId, quantity })
    .then(cartItem => {
      CartItem.findOne({ where: { id: cartItem.id }, include: { model: Product } })
        .then(cartItem => res.status(201).send(cartItem))
        .catch(() => res.status(404).send('Error finding new cart item'))
    })
    .catch(e => {
      res.status(400).send('Error creating new cart item!')
      next(e)
    })
})

// retrieve single CartItem, or all CartItem(s) (GET - '/:cartItemId?')

router.get('/:cartItemId?', (req, res, next) => {
  const { cartItemId } = req.params;
  if (cartItemId) {
    CartItem.findOne({ where: { id: cartItemId }, include: { model: Product } })
      .then(cartItem => res.status(302).send(cartItem))
      .catch(e => {
        res.status(404).send('Cart item not found!')
        next(e)
      })
  } else {
    CartItem.findAll({ include: { model: Product } })
      .then(cartItems => res.status(302).send(cartItems))
      .catch(e => {
        res.status(404).send('Error finding all cart items')
        next(e)
      })
  }
})

// edit cart item (PUT - '/:cartItemId')

router.put('/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  CartItem.update({ ...cartItem, ...req.body }, { where: { id: cartItemId }, returning: true })
  CartItem.findOne({ where: { id: cartItemId } })
  // finish this
})

// delete cart item (DELETE - '/:cartItemId')


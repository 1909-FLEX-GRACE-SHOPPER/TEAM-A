const express = require('express');
const Sequelize = require('sequelize');
const router = require('express').Router()
const { CartItem, Product } = require('../../db/models')

router.use(express.json());

// CART-ITEM: (/api/cartItem)
// add to cart (POST - '/') - creates new CartItem, uses productId of selected product, cartId

router.post('/', (req, res, next) => {
  const { cartId, productId, quantity } = req.body;
  CartItem.create({ cartId, productId, quantity })
    .then(cartItem => {
      CartItem.findOne({
        where: {
          id: cartItem.id
        },
        include: {
          model: Product
        }
      })
        .then(cartItem => {
          if (cartItem) {
            res.status(201).send(cartItem)
          } else {
            res.status(404).send('Error finding new cart item')
            next(e)
          }
        })
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
    CartItem.findOne({
      where: {
        id: cartItemId
      },
      include: {
        model: Product
      }
    })
      .then(cartItem => {
        if (cartItem) {
          res.status(302).send(cartItem)
        } else {
          res.status(404).send('Cart item not found!')
          next(e)
        }
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
// only quantity can be updated currently

router.put('/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  const { id, cartId, productId } = req.body;
  if (id || cartId || productId) {
    return res.status(400).send('Only quantity can be updated')
  }
  CartItem.findOne({
    where: {
      id: cartItemId
    }
  })
    .then(cart => {
      cart.update({ 
        ...cart, 
        quantity: req.body.quantity || cart.quantity, 
      }, { 
        returning: true 
      })
        .then(updatedItem => res.status(200).send(updatedItem))
        .catch(e => {
          res.status(400).send('Error updating cart item');
          next(e);
        })
    })
    .catch(e => {
      res.status(404).send('Error finding cart item');
      next(e);
    })
})

// delete cart item (DELETE - '/:cartItemId')

router.delete('/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  CartItem.destroy({
    where: {
      id: cartItemId
    }
  })
    .then(() => res.status(204).send('Successfully deleted cart item'))
    .catch(e => {
      res.status(400).send('Error deleting cart item')
      next(e)
    })
})

module.exports = router;
const Sequelize = require('sequelize');
const router = require('express').Router()
const { Cart, CartItem, User, Product } = require('../../db')

// retrieve single cart based on either userId (if signed in) or sessionId
router.get('/', (req, res, next) => {
  if (req.user) {
    Cart.findOne({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: CartItem,
          include: [
            Product
          ]
        }
      ]
    })
      .then(cart => {
        return res.send(cart)
      })
      .catch(e => {
        res.status(500).send('error in GET cart/ route')
        next(e)
      })
  } else {
    Cart.findOne({
      where: {
        sessionId: req.cookies.sessionId
      },
      include: [
        {
          model: CartItem,
          include: [
            Product
          ]
        }
      ]
    })
      .then(cartOrNull => {
        if (cartOrNull) {
          res.status(200).send(cartOrNull);
        }
        else {
          res.status(200).send({})
        }
      })
      .catch(e => {
        res.status(500).send('error in GET cart/ route')
        next(e)
      })
  }
});

//check the database for a specific userId. Used when logging a user in.
router.get('/user/:id', (req, res, next) => {
  Cart.findOne({ where: { userId: req.params.id }, include: [{ model: CartItem }] })
    .then(cart => {
      return res.status(200).send(cart);
    })
    .catch(e => {
      res.status(500).send('error in /cart/user route')
      next(e)
    })
});

//POST
//Creates a new cart. If a user is logged in, the router will just return the existing cart for that user. 
//If no user, the session Id is used to generate a new cart for that session
router.post('/', (req, res, next) => {
  if (req.user) {
    Cart.findOne({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: CartItem,
          include: [
            Product
          ]
        }
      ]
    })
      .then(foundCart => {
        if (foundCart) {
          res.status(201).send(foundCart)
        }
        else {
          res.status(400).send('User is logged in but could not find cart')
          next()
        }
      })
  } else {
    Cart.create({ sessionId: req.cookies.sessionId })
      .then(() => {
        Cart.findOne({
          where: {
            sessionId: req.cookies.sessionId
          },
          include: [
            {
              model: CartItem,
              include: [
                Product
              ]
            }
          ]
        })
          .then(newCart => {
            if (newCart) {
              res.status(201).send(newCart)
            } else {
              res.status(400).send('Error finding new cart!')
              next()
            }
          })
      })
      .catch(e => {
        res.status(400).send('Error creating new cart!')
        next(e)
      })
  }
});

//PUT
router.put('/:cartId?', (req, res, next) => {
  // if there is no cartId, request simply finds cart associated with current user
  if (!req.params.cartId) {
    Cart.findOne({
      where: {
        userId: req.user.id,
      }
    })
      .then(userCart => {
        if (userCart) {
          res.status(200).send(userCart)
        }
        else {
          res.status(400).send('could not find cart')
        }
      })
  } else {
    Cart.findOne({
      where: {
        id: req.params.cartId
      }
    })
      .then(cart => {
        if (cart) {
          cart.update({
            userId: req.user.id,
            sessionId: req.cookies.sessionId,
            cartitems: [...req.body.cartItems, ...cart.cartitems]
          })
            .then(cart => res.status(200).send(cart))
            .catch(e => {
              res.status(500).send('error in PUT /cart/:cartId route')
              next(e)
            })
        }
        else {
          res.status(400).send('could not find cart')
        }
      })
  }
});



// clear cart (PUT - '/:cartId')
router.put('/clear/:cartId', (req, res, next) => {
  const { cartId } = req.params;
  CartItem.destroy({ where: { cartId } })
    .then(() => {
      Cart.findOne({ where: { cartId } })
        .then(clearedCart => {
          if (clearedCart) {
            res.send(clearedCart)
          }
          else {
            res.status(400).send('Error finding cleared cart')
          }
        })
    })
    .catch(e => {
      res.status(400).send('Error destroying cartitems');
      next(e);
    })
})

router.delete('/:cartId', (req, res, next) => {
  Cart.destroy({ where: { id: req.params.cartId } })
    .then(() => {
      return res.status(200).send(`Cart ${req.params.cartId} successfully destroyed`);
    })
    .catch(e => {
      res.status(400).send('Error destroying cart');
      next(e);
    })
});

module.exports = router;

//archived for troubleshooting purposes
// router.get('/user', (req, res, next) => {
//   if (req.user) {
//     Cart.findOne({
//       where: { 
//         userId: req.user.id
//       }, 
//       include: [
//         { model: CartItem }
//       ] 
//     })
//     .then(cart => {
//       return res.send(cart)
//     })
//     .catch(e => {
//       res.status(500).send('error in /cart/user route')
//       next(e)
//     })
//   } else {
//     return res.send(null);
//   }
// });

// //get cart by sessionId
// router.get('/session', (req, res, next) => {
//   Cart.findOne({ 
//       where: { 
//         sessionId: req.cookies.sessionId
//       }, 
//       include: [
//         { model: CartItem }
//       ] 
//     })
//     .then(cart => {
//         return res.status(200).send(cart);
//     })
//     .catch(e => {
//       res.status(500).send('error in /cart/session route')
//       next(e)
//     })
// });
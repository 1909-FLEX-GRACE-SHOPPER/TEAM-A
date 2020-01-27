const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const { Order, OrderItem } = require('../../db');

router.use(express.json());

//return a single order (and items) by id
router.get('/:orderId', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.orderId,
    },
    include: [{
      model: OrderItem,
    }],
  })
    .then(result => {
      if (result) {
        return res.status(200).send(result);
      }
      res.status(404).send('Not found');
    })
    .catch(e => {
      res.status(400).send('Invalid request');
      next(e);
    })
});

//return all orders for current session
router.get('/session', (req, res, next) => {
  Order.findOne({
    where: {
      sessionId: req.cookies.sessionId
    },
    include: [
      {
        model: OrderItem,
      }
    ]
  })
  .then(result => {
    if (result) {
      return res.status(200).send(result);
    }
    res.status(404).send('Not found');
  })
  .catch(e => {
    res.status(400).send('Invalid request');
    next(e);
  })
})

//return all orders for current logged in user
router.get('/user/', (req, res, next) => {
  if (req.user) {
    Order.findAll({
      where: {
        userId: req.user.id,
      },
      include: [{
        model: OrderItem,
      }],
    })
      .then(results => {
        if (results) {
          return res.status(200).send(results);
        }
        return res.status(200).send([]);
      })
      .catch(e => {
        res.status(400).send('Invalid request for orders by userId');
        next(e);
      })
  }
  return res.status(400).send('Invalid request for orders by userId');
});

//return all orders, with optional sort query parameter in url
//example 1: /api/order
//example 2: /api/order?sort=status&dir=ASC
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: OrderItem,
    }],
    order: [
      [req.query.sort || 'createdAt', req.query.dir || 'ASC']
    ],
  })
    .then(results => {
      res.status(200).send(results);
    })
    .catch(e => {
      res.status(400).send('Invalid request');
      next(e);
    })
});

//create new order. UserId is required
router.post('/', (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send('Invalid request; userId required');
  }
  Order.create({
    status: req.body.status || 'cart',
    userId: req.body.userId,
  })
    .then(created => {
      res.status(201).send(created);
    })
    .catch(e => {
      res.status(400).send('Invalid request');
      next(e);
    })
});

//Update an order
router.put('/:orderId', (req, res, next) => {
  Order.update(
    {
      status: req.body.status || 'cart',
      userId: req.user.id || null
    },
    {
      where: {
        id: req.params.orderId
      },
      returning: true,
    }
  )
    .then(updated => {
      if (updated[0]) {
        return res.status(200).send(updated[1]);
      }
      res.status(404).send('Not found');
    })
    .catch(e => {
      res.status(400).send('Invalid request');
      next(e);
    })
});

//delete order. This also deletes all associated orderItems
router.delete('/:orderId', (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    },
    include: [{
      model: OrderItem,
    }],
  })
    .then(() => {
      res.status(204).send(`deleted order ${req.params.orderId}`);
    })
    .catch(e => {
      res.status(400).send('Invalid request');
      next(e);
    })
});


module.exports = router;
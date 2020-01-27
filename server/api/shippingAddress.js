const Sequelize = require('sequelize');
const router = require('express').Router()
const { ShippingAddress, User } = require('../../db/models/index')

// create shipping address

router.post('/', (req, res, next) => {
  const { name, line1, line2, city, state, zip, userId } = req.body;
  if (!name || !line1 || !city || !state || !zip || !userId) {
    res.status(400).send('Invalid request. Name, Address line 1, City, State, Zipcode and UserId are required fields. Please try again with all required fields.')
  }
  else {
    ShippingAddress.create({ name, line1, line2, city, state, zip, userId })
      .then(address => res.status(201).send(address))
      .catch(e => {
        res.status(400).send('Error creating shipping address');
        next(e)
      })
  }
})

// fetch shipping address

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  ShippingAddress.findOne({
    where: {
      userId
    },
    include: {
      model: User,
    }
  })
    .then(address => res.status(200).send(address))
    .catch(e => {
      res.status(404).send(`Shipping address for userId ${userId} not found`)
      next(e)
    })
});

// edit shipping address

router.put('/:userId', (req, res, next) => {
  const { userId } = req.params;
  ShippingAddress.findOne({ where: { userId } })
    .then(address => {
      const name = req.body.name ? req.body.name : address.name;
      const line1 = req.body.line1 ? req.body.line1 : address.line1;
      const line2 = req.body.line2 ? req.body.line2 : address.line2;
      const city = req.body.city ? req.body.city : address.city;
      const state = req.body.state ? req.body.state : address.state;
      const zip = req.body.zip ? req.body.zip : address.zip;
      const userId = req.body.userId ? req.body.userId : address.userId;
      address.update({
        name,
        line1,
        line2,
        city,
        state,
        zip,
        userId
      }, {
          returning: true
        })
        .then(updatedAddress => res.status(200).send(updatedAddress))
        .catch(e => {
          res.status(400).send(`Error updating shipping address for userId ${userId}`)
          next(e)
        })
    })
    .catch(e => {
      res.status(404).send(`Shipping address for userId ${userId} not found.`)
      next(e)
    })
})


module.exports = router;
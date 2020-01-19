const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const { OrderItem } = require('../../db');

router.use(express.json());

//create an OrderItem. productId and orderId are required
router.post('/', (req, res, next) => {
    const { quantity, pricePaid, productId, orderId } = req.body;

    //return 400 if productId & orderId are both not present
    if (! productId && orderId) {
        return res.status(400).send('Invalid request');
    }

    OrderItem.create({
        quantity: quantity || 1,
        pricePaid, 
        productId,
        orderId,
    })
    .then(created => {
        res.status(201).send(created);
    })
    .catch(e => {
        res.status(400).send('Invalid request');
        next(e);
    })
});

//update Order Item. Only quantity can be updated.
//quantity of 0 not allowed
router.put('/:orderItemId', (req, res, next) => {
    OrderItem.update(
        {
            quantity: req.body.quantity || 1,
        },
        {
        where: {
            id: req.params.orderItemId
        },
        returning: true,
    })
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

module.exports = router;

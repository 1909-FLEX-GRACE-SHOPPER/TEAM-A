const express = require('express');
const Sequelize = require('sequelize');
const router = require('express').Router();
const process = require('process');
const chalk = require('chalk');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async(req, res, next) => {
        const intent = await stripe.paymentIntents.create(
            {
                amount: 1099,
                currency: 'usd',
                payment_method: req.body.pmId,
                confirm: true,
                error_on_requires_action: true
            }
        );
        if (intent.status === 'succeeded') {
            res.status(200).send({ success: true });
        }
        else {
            return response.send({ success: false });
        }
});

module.exports = router;
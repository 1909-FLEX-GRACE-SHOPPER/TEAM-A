const express = require('express');
const Sequelize = require('sequelize');
const router = require('express').Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', (req, res, next) => {
    stripe.paymentIntents.create({
        amount: 2299,
        currency: 'usd',
        payment_method:
        payment_method_types: ['card'],
        confirm: true,
        error_on_requires_action: true
    })
    .then(intent => {
        console.log(intent);
        if (intent.status === 'succeeded') {
            return res.status(200).send({ success: true });
        } else {
            return res.status(500).send({error: 'Unexpected status ' + intent.status});
        }
    })
    .catch(e => {
        console.error(e);
        return res.status(500).send({ error: e.type });
    })
});

module.exports = router;
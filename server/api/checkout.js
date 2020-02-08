const express = require('express');
const Sequelize = require('sequelize');
const router = require('express').Router();
const process = require('process');
const chalk = require('chalk');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async(req, res, next) => {
    console.log(chalk.magenta(`I'm inside the POST route! Here's the secret key: ${process.env.STRIPE_SECRET_KEY}`));
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
            res.send(intent.client_secret);
        }
        else {
            return response.status(500).send({error: 'Unexpected status ' + intent.status});
        }
});

module.exports = router;
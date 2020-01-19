var express = require('express');
var router = express.Router();
const { User, Cart, Order } = require('../../db');
const { generateSessionId } = require('../utils');


//return a single user by id
//includes cart and orders
router.get('/:userId', (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.userId,
        },
        include: [
            {
                model: Cart,
            },
            {
                model: Order,
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
});

//return all users with optional sorting parameters
//does not include any associated models
//example 1: /api/user
//example 2: /api/user?sort=firstName&dir=ASC
router.get('/', (req, res, next) => {
    User.findAll({
        order: [
            [req.query.sort || 'lastName', req.query.dir || 'ASC']
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

//update a user
//right now, the only field that can be updated is the sessionId
router.put('/:userId', (req, res, next) => {
    User.update(
        {
            sessionId: req.body.sessionId
        },
        {
            where: {
                id: req.params.userId
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

//special post method for creating a guest user
//generates a user random string email and hashed password,
//returns said user with sessionId
router.post('/guest', (req, res, next) => {
    //todo: replace this function with something more secure
    const sessionId = generateSessionId();
    User.create({
        firstName: 'guest',
        lastName: 'guest',
        email: `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}@guest.com`,
        //todo: replace this with the hashing function on a random string
        hashedPassword: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        isRegistered: false,
        sessionId,
    })
    .then(created => {
        res.status(201).send(created);
    })
    .catch(e => {
        res.status(400).send('Invalid request');
        next(e);
    })
});

router.post('/', (req, res, next) => {
    const sessionId = generateSessionId();
    //TODO: HASH PASSWORD ON FRONTEND
    const hashedPassword = req.body.password;
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hashedPassword,
        isRegistered: true,
        sessionId,
    })
    .then(created => {
        res.status(201).send(created);
    })
    .catch(e => {
        res.status(400).send('Invalid request');
        next(e);
    })
});

module.exports = router;
const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

//the frontend can call this route to retrieve the loggedIn user
router.get('/', (req, res, next) => {
    if (req.user) {
        return res.status(201).send(req.user);
    }
    return res.send(null);
});

module.exports = router;
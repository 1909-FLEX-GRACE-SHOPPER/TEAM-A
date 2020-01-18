const express = require('express');

const router = express.Router();

//add additional routes here
router.use('/order', require('./order'));


//error handling
router.use((req, res, next) => {
    const err = new Error(`Invalid API path: ${req.baseUrl}`);
    err.status = 404;
    next(err)
})

module.exports = router;
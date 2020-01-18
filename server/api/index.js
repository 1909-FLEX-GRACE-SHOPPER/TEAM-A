const express = require('express');

const router = express.Router();

router.use('/order', require('./order'));
//add additional routes here

//error handling
router.use((req, res, next) => {
    const err = new Error(`Invalid API path: ${req.baseUrl}`);
    err.status = 404;
    next(err)
  })
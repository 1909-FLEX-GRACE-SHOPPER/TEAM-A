const router = require('express').Router()
const { Review } = require('../../db')
const Sequelize = require('sequelize')

router.get('/', (req, res, next) => {
    Review.findAll()
        .then(reviews => res.status(200).send(reviews))
        .catch(e => {
            res.status(400).send('error in finding all reviews')
            next(e)
        })
})
module.exports = router
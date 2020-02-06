const router = require('express').Router()
const { Review } = require('../../db')
const Sequelize = require('sequelize')

router.get('/:reviewId?', (req, res, next) => {
  const { reviewId } = req.params;
  if (reviewId) {
    Review.findOne({
      where:
      {
        id: reviewId
      }
    })
      .then(review => {
        if (review) {
          res.status(302).send(review);
        }
        else {
          res.status(404).send('Review not found')
          next()
        }
      })
  } else {
    Review.findAll()
      .then(reviews => res.status(200).send(reviews))
      .catch(e => {
        res.status(400).send('Error finding all reviews');
        next(e)
      })
  }
})

router.post('/:productId', (req, res, next) => {
  const { title, body, userId } = req.body;
  const { productId } = req.params;
  if (!title || !body || !userId) {
    return res.status(400).send('Invalid request; title, body & userId required');
  }
  Review.create({ title, body, userId, productId })
    .then(review => res.status(201).send(review))
    .catch(e => {
      res.status(400).send('Error creating new review');
      next(e);
    });
})



module.exports = router
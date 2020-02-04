const router = require('express').Router()
const { Review } = require('../../db')
const Sequelize = require('sequelize')

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.status(200).send(reviews))
    .catch(e => {
      res.status(400).send('Error finding all reviews');
      next(e)
    })
})

router.post('/:productId', (req, res, next) => {
  const { review, rating } = req.body;
  const { productId } = req.params;
  if (!review && !rating) {
    return res.status(400).send('Invalid request; review or rating required');
  }
  Review.create({ review: review ? review : 'No review', rating: rating ? rating : null, productId })
    .then(review => res.status(201).send(review))
    .catch(e => {
      res.status(400).send('Error creating new review');
      next(e);
    });
})



module.exports = router
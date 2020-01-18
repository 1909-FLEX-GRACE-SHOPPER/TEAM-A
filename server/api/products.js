const Sequelize = require('sequelize');
const router = require('express').Router()
const { Product } = require('../../db')

router.get('/', async function (req, res, next){
	try {
		const products = await Product.findAll()
  		res.status(200).send(products)
	} catch (error) {
		console.log(error)
		next(error)
	}
});

router.get('/:productId', async function (req, res, next){
	try {
		const product = await Product.findOne({
			where: {
			  id: req.params.productId
			},
		})
  		res.status(200).send(product)
	} catch (error) {
		console.log(error)
		next(error)
	}  	
});

router.post('/', function (req, res, next) {
	Product.create(req.body)
	.then(product => res.status(201).send(product))
	.catch(next);
  });

  router.put('/:productId', (req, res, next) => {
	const { name, description, inventory, price } = req.body;
	const { productId } = req.params;
	Product.findByPk(productId)
	  .then(foundProduct => {
		return foundProduct.update({
			name, description, inventory, price
		});
	  })
	  .then(updatedProduct => {
		return res.status(201).send(updatedProduct);
	  })
	  .catch(err => next(err));
  });

  router.delete('/:productId', (req, res, next) => {
	const { productId } = req.params;
	Product.destroy({
	  where: {
		productId,
	  },
	})
	  .then(() => res.status(200).end())
	  .catch(err => next(err));
  });

  
module.exports = router; 
const Sequelize = require('sequelize');
const router = require('express').Router()
const { Product } = require('../../db')

//fetch all products
router.get('/', (req, res, next) => {
  const { cat } = req.query;
  if (cat) {
    Product.findAll({
      where: {
        category: cat,
      }
    })
      .then(products => res.status(200).send(products))
      .catch(e => {
        res.status(400).send('error finding products by category')
        next(e)
      })
  }
  else {
    Product.findAll()
      .then(products => res.status(200).send(products))
      .catch(e => {
        res.status(400).send('error in finding all products')
        next(e)
      })
  }
});

//fetch product with product id
router.get('/:productId', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.productId,
    }
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

//add new product
router.post('/', function (req, res, next) {
  if (req.user && req.user.dataValues.isAdmin) {
    const { name, description, inventory, price } = req.body;
    if (!name) {
      return res.status(400).send('Invalid request; name required');
    }
    Product.create({ name, description, inventory, price })
      .then(product => res.status(201).send(product))
      .catch(next);
  } else {
    return res.status(403).send('Invalid user credentials');
  }
});

//update product for specific product id
router.put('/:productId', (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.dataValues.isAdmin) {
    const { name, description, inventory, price } = req.body;
    const { productId } = req.params;
    Product.update(
      {
        name, description, inventory, price
      },
      {
        where: {
          id: req.params.productId
        },
        returning: true,
      }
    )
      .then(updated => {
        if (updated[0]) {
          return res.status(200).send(updated[1]);
        }
        return res.status(404).send('Product not found');
      })
      .catch(e => {
        res.status(400).send('Invalid request');
        next(e);
      })
  } else {
    return res.status(403).send('Invalid user credentials');
  } 
});

//delete product.
router.delete('/:productId', (req, res, next) => {
  if (req.user && req.user.dataValues.isAdmin) {
    Product.destroy({
      where: {
        id: req.params.productId
      },
    })
      .then(() => {
        return res.status(204).send(`deleted product ${req.params.productId}`);
      })
      .catch(e => {
        res.status(400).send('Invalid request');
        next(e);
      })
  } else {
    return res.status(403).send('Invalid user credentials');
  }
  
});


module.exports = router; 
const { Op } = require('sequelize');
const router = require('express').Router()
const { Product, Review, User } = require('../../db')

//fetch all products
//optional query parameter for limit and offset
//formats:
//get api/products?cat=noms
//get api/products?cat=noms&page=2
//fetch product with product id
router.get('/:productId', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.productId,
    },
    include: [{
      model: Review,
      include: [{
        model: User,
      }]
    }]
  })
    .then(result => {
      if (result) {
        return res.status(200).send(result);
      }
      res.status(404).send('Not found');
    })
});

router.get('/', (req, res, next) => {
  const { all, val } = req.query;
  if (all == 'true') {
    Product.findAll()
      .then(products => res.status(200).send(products))
      .catch(e => next(e))
  } else if (val) {
    Product.findAll({
      where: {
        name: { [Op.iLike]: `%${val}%` }
      },
      include: {
        model: Review
      },
      limit: 10,
      offset: (req.query.page || 0) * 10,
    })
      .then(products => res.status(200).send(products))
      .catch(e => {
        res.status(400).send('error finding products by category')
        next(e)
      })
  }
  else {
    Product.findAll({
      limit: 10,
      offset: (req.query.page || 0) * 10,
      include: {
        model: Review
      }
    })
      .then(products => res.status(200).send(products))
      .catch(e => {
        res.status(400).send('error in finding all products')
        next(e)
      })
  }
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
  if (req.user && !req.user.dataValues.isAdmin) {
    const { averageRating, numRatings } = req.body;
    const { productId } = req.params;
    Product.update(
      {
        averageRating, numRatings
      },
      {
        where: {
          id: productId
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
  }
  else if (req.user.dataValues.isAdmin) {
    const { name, description, inventory, price } = req.body;
    const { productId } = req.params;
    Product.update(
      {
        name, description, inventory, price
      },
      {
        where: {
          id: productId
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
  }
  else {
    return res.status(403).send('Invalid user credentials');
  }
});

// alternative PUT route:

// router.put('/:productId', (req, res, next) => {
//   console.log(req.user);
//   // if (req.user && req.user.dataValues.isAdmin) {
//   const { name, description, inventory, price, averageRating, numRatings } = req.body;
//   const { productId } = req.params;
//   Product.findOne({
//     where: {
//       id: productId
//     }
//   })
//     .then(product => {
//       if (product) {
//         product.update({
//           name: name || product.name,
//           description: description || product.description,
//           inventory: inventory || product.inventory,
//           price: price || product.price,
//           averageRating: averageRating || product.averageRating,
//           numRatings: numRatings || product.numRatings,
//         })
//           .then(product => res.status(200).send(product))
//           .catch(() => {
//             res.status(400).send('Error updating product')
//             next()
//           })
//       }
//       else {
//         res.status(404).send('Product not found');
//       }
//     })
//   // } else {
//   //   res.status(403).send('Invalid user credentials');
//   // }
// });

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
const Sequelize = require('sequelize');
const connection = require('../connection');
const { categoriesArr } = require('../../constants')

const Product = connection.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'product name',
    validate: {
      notEmpty: true,
      len: [1, 250],
    }
  },
  category: {
    type: Sequelize.ENUM(categoriesArr),
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: '',
    validate: {
      len: [0, 500],
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 5000,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0,
      max: 5000,
    }
  },
  price: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0.01,
      max: 9999.99
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://graceshopper.nyc3.cdn.digitaloceanspaces.com/Untitled_Artwork.png',
  },
  averageRating: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 5.0
    }
  },
  numRatings: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Product;
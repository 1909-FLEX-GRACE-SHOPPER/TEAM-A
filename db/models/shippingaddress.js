const Sequelize = require('sequelize');
const connection = require('../connection');

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

const ShippingAddress = connection.define('shippingAddress', {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: [1, 50],
    }
  },
  line1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50],
    }
  },
  line2: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: [1, 50],
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50],
    }
  },
  state: {
    type: Sequelize.ENUM(states),
    allowNull: false,
    validate: {
      notEmpty: true,
      isUppercase: true,
    }
  },
  zip5: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
      len: [5]
    }
  },
  zip4: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: true,
      len: [4]
    }
  },
})

module.exports = ShippingAddress;
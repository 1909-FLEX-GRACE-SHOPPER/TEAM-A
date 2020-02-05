const { expect } = require('chai');
const { connection } = require('../db/');
const { Product, User, Cart, Session } = require('../db');
const { categoriesArr } = require('../constants')
const faker = require('faker');
const sinon = require('sinon');
const app = require('../server');
const agent = require('supertest')(app);
const Sequelize = require('sequelize');


describe('API Routes', async () => {
  before(async () => {
    await connection.sync({ force: true });
  });

  after(async () => {
    await connection.sync({ force: true });
  });

  describe('Product Routes', async () => {
    let productList = Array(10);
    let createdProducts
    before(async () => {
      //generate data
      for (let i = 0; i < 10; i++) {
        productList[i] = {
          name: faker.commerce.productName(),
          category: categoriesArr[Math.floor(Math.random() * categoriesArr.length)],
          description: faker.lorem.sentence(),
          inventory: Math.round(Math.random() * 2000),
          price: faker.commerce.price(1.00, 99.99, 2),
        }
      };
      createdProducts = await Promise.all(productList.map(product => Product.create({ ...product })));
    });

    it('GET / responds with all products', async () => {
      const responseBody = (await agent.get('/api/products')).body;
      expect(responseBody.length).to.equal(10);
      responseBody.forEach((prod) => {
        //find same prod ID in createdProdcuts.
        let currentProduct = createdProducts.find(product => product.id === prod.id)
        expect(prod.name).to.equal(currentProduct.name);
        expect(prod.description).to.equal(currentProduct.description);
        expect(prod.category).to.equal(currentProduct.category);
        expect(prod.inventory).to.equal(currentProduct.inventory);
        expect(prod.price).to.equal(currentProduct.price);
      });
    });

    it('GET /:productId responds with specified product', async () => {
      let randomId = Math.floor(Math.random() * 10) % 10 || 1;
      const response = (await agent.get(`/api/products/${randomId}`)).body;
      //get a created product with randomId generated.
      let productToCompare = createdProducts.find(product => product.id === response.id).dataValues
      expect(response.id).to.equal(productToCompare.id);
      expect(response.name).to.equal(productToCompare.name);
      expect(response.description).to.equal(productToCompare.description);
      expect(response.category).to.equal(productToCompare.category)
      expect(response.inventory).to.equal(productToCompare.inventory);
      expect(response.price).to.equal(productToCompare.price);
    });

  });

  describe('User Routes', async () => {
    let userList = [
      { firstName: 'Will', lastName: 'Apple', email: 'FreshPrince@gmail.com', password: 'abc' },
      { firstName: 'John', lastName: 'Doe', email: 'Jdoe@gmail.com', password: 'xyz' },
      { firstName: 'Homer', lastName: 'Zebra', email: 'donuts@gmail.com', password: '123' },
    ];
    let createdUser
    before(async () => {
      createdUser = await Promise.all(userList.map(user => User.create({ ...user })));
    });

    it('GET /api/user responds with all users', async () => {
      const responseBody = (await agent.get('/api/user')).body;
      responseBody.forEach(responseUser => {
        let userToCompare = createdUser.find(user => user.id === responseUser.id);
        expect(responseBody.length).to.equal(userList.length);
        //by default, the /user API returns sorted by LastName
        expect(responseBody[0].lastName).to.equal('Apple');
        expect(userToCompare.firstName).to.equal(responseUser.firstName)
        expect(userToCompare.lastName).to.equal(responseUser.lastName)
        expect(userToCompare.email).to.equal(responseUser.email)
      })
    });

    it('GET :userId responds with specified user', async () => {
      const randomUserId = Math.floor(Math.random() * userList.length) || 1;
      const response = (await agent.get(`/api/user/${randomUserId}`))
      let userToCompare = createdUser.find(user => response.body.id === user.id)

      expect(response.body.firstName).to.equal(userToCompare.firstName);
      expect(response.body.lastName).to.equal(userToCompare.lastName);
      expect(response.body.email).to.equal(userToCompare.email)
    });
  });

  xdescribe('Cart Routes', async () => {
    before(async () => {
      const user = await User.create(
        { firstName: 'Will', lastName: 'Apple', email: 'FreshPrince@gmail.com', password: 'abc' }
      )
    });

    it('cart created', async () => {
      const cart = await agent.get('/api/cart')
    })
  });

});
const { expect } = require('chai');
const { connection } = require('../db/');
const { Product, User, Cart, CartItem, Session } = require('../db');
const { categoriesArr } = require('../constants')
const faker = require('faker');
const sinon = require('sinon');
const app = require('../server');
const agent = require('supertest')(app);

describe('API Routes', async () => {
  before(async () => {
    await connection.sync({ force: true });
  });

  after(async () => {
    await connection.sync({ force: true });
  });

  describe('GET /api/products', async () => {
    let productList = Array(3);
    before(async () => {
      //generate data
      for (let i = 0; i < 3; i++) {
        productList[i] = {
          name: faker.commerce.productName(),
          category: categoriesArr[Math.floor(Math.random() * categoriesArr.length)],
          description: faker.lorem.sentence(),
          inventory: Math.round(Math.random() * 2000),
          price: faker.commerce.price(1.00, 99.99, 2),
        }
      };

      await Promise.all(productList.map(product => Product.create({ ...product })));
    });

    it('GET / responds with all products', async () => {

      const responseBody = (await agent.get('/api/products')).body;
      expect(responseBody.length).to.equal(3);
      responseBody.forEach((prod, idx) => {
        expect(prod.name).to.equal(productList[idx].name);
        expect(prod.description).to.equal(productList[idx].description);
        expect(prod.category).to.equal(productList[idx].category);
        expect(prod.inventory).to.equal(productList[idx].inventory);
        expect(prod.price).to.equal(productList[idx].price);
      });
    });

    it('GET /:productId responds with specified product', async () => {

      let randomIdx = Math.floor(Math.random() * 10) % 3 || 1;
      const response = (await agent.get(`/api/products/${randomIdx}`)).body;
      expect(response.id).to.equal(randomIdx);
      expect(response.name).to.equal(productList[randomIdx - 1].name);
      expect(response.description).to.equal(productList[randomIdx - 1].description);
      expect(response.inventory).to.equal(productList[randomIdx - 1].inventory);
      expect(response.price).to.equal(productList[randomIdx - 1].price);

    });

  });

  describe('User Routes', async () => {
    let userList = [
      { firstName: 'Will', lastName: 'Apple', email: 'FreshPrince@gmail.com', password: 'abc' },
      { firstName: 'John', lastName: 'Doe', email: 'Jdoe@gmail.com', password: 'xyz' },
      { firstName: 'Homer', lastName: 'Zebra', email: 'donuts@gmail.com', password: '123' },
    ];
    before(async () => {
      await Promise.all(userList.map(user => User.create({ ...user })));
    });

    after(async() => {
      
    });

    it('GET /api/user responds with all users', async () => {
      const responseBody = (await agent.get('/api/user')).body;
      expect(responseBody.length).to.equal(userList.length);

      //by default, the /user API returns sorted by LastName
      expect(responseBody[0].lastName).to.equal('Apple');
    });
  });

  describe('GET /api/cart', async () => {

    before(async() => {
      //generate data
      await connection.sync({ force: true });
      const session = (await Session.create()).dataValues;
      console.log(session);

      const user = (await User.create({
        firstName: 'Will',
        lastName: 'Apple',
        email: 'FreshPrince@gmail.com',
        password: 'abc',
      })).dataValues;

      const sessionCart = (await Cart.create({
        sessionId: session.id,
      })).dataValues

      const userCart = (await Cart.create({
        userId: user.id,
      })).dataValues;

    });

    it('GET / responds with cart that matches userId when user is logged in', async () => {
      const responseBody = (await agent.get('/api/cart')).body;
      expect(responseBody.length).to.equal(1);
      // finish
    });

    it('GET / responds with cart that matches sessionId when user is not logged in', async () => {
      const responseBody = (await agent.get('/api/cart')).body;
      expect(responseBody.length).to.equal(1);
      // finish
    });

    it('GET /user/:id responds with cart for specified user', async () => {
      const response = (await agent.get(`/api/cart/user/${user.id}`)).body;
      expect(response.userId).to.equal(user.id);
      expect(response.id).to.equal(userCart.id);
    });

    it('POST / responds with existing cart for user if user is logged in', async () => {
      // finish
    });

    it('POST / responds with new cart for sessionId if user is not logged in', async () => {
      // finish
    });

    it('PUT /:cartId updates and sends cart with given ID', async () => {
      let cartItemsList = Array(2);
      for (let i = 0; i < cartItemsList.length; i++) {
        cartItemsList[i] = {
          productId: Math.round(Math.random() * 20),
          quantity: Math.round(Math.random() * 10),
          cartId: sessionCart.id,
        }
      };
      const cartItems = await Promise.all(cartItemsList.map(cartItem => CartItem.create({ ...cartItem })));
      const responseBody = (await agent.put(`/api/cart/${userCart.id}`, { cartItems })).body;
      const cartItemsIds = cartItems.map(item => item.id)
      expect(responseBody.length).to.equal(1);
      expect(Array.isArray(responseBody.cartitems)).to.be.true;
      expect(cartItemsIds).to.include(responseBody.cartitems[0].id)
      expect(cartItemsIds).to.include(responseBody.cartitems[1].id)
    });

    it('PUT /clear/:cartId destroys all cartItems with given cartId and returns empty cart', async () => {
      // finish
    });

    it('DELETE /:cartId destroys cart with given ID', async () => {
      // finish
    });

  });

});

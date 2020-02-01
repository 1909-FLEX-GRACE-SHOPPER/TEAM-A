const faker = require('faker');
const chalk = require('chalk');
const { connection, User, Cart, CartItem, Product, Order, OrderItem } = require('./db');
const { categorize } = require('./server/utils')
const { orderStatuses } = require('./constants')

const GENERATED_PRODUCTS = 100;
const GENERATED_USERS = 50;
const GENERATED_ORDERS = 100;
const MAX_ORDERITEMS = 10;
const MAX_CARTITEMS = 10;

//helper function that randomly returns true or false
const randomBool = () => {
  return !(Math.round(Math.random()));
}

const seed = async () => {
  try {
    console.log(chalk.white('*** FILE: seed.js'));
    console.log(chalk.white('Opening database connection'));
    await connection.sync({ force: true });

    //generate list of users, random guests or registered
    let userList = [
      {
        firstName: 'joe',
        lastName: 'smith',
        email: 'joe@gmail.com',
        password: '123',
        isRegistered: true,
      },
      {
        firstName: 'admin',
        lastName: 'smith',
        email: 'admin@gmail.com',
        password: 'admin',
        isRegistered: true,
        isAdmin: true
      }
    ];
    for (let i = 0; i < GENERATED_USERS; i++) {
      userList.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(16),
        isRegistered: true,
      })
    }
    //create users
    const createdUsers = await Promise.all(
      userList.map(user => User.create({ ...user }))
    );

    //create a cart record for each user
    const createdCarts = await Promise.all(
      createdUsers.map(user => Cart.create({ userId: user.id }))
    );

    //generate list of random products
    let productList = Array(GENERATED_PRODUCTS);
    for (let i = 0; i < GENERATED_PRODUCTS; i++) {
      productList[i] = {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        inventory: Math.round(Math.random() * 2000),
        price: faker.commerce.price(1.00, 99.99, 2),
        imageUrl: `${faker.image.nature()}?random=${Date.now()}`
      }
      productList[i].category = categorize(productList[i].name.split(' ')[2])
    }

    //create products
    const createdProducts = await Promise.all(
      productList.map(product => Product.create({ ...product }))
    );

    //generate cart items from products and carts
    for (let i = 0; i < GENERATED_USERS; i++) {
      let totalItems = Math.round(Math.random() * MAX_CARTITEMS);
      for (let j = 0; j < totalItems; j++) {
        const randomProduct = Math.floor(Math.random() * GENERATED_PRODUCTS);
        await CartItem.create({
          quantity: Math.ceil(Math.random() * 10),
          cartId: createdCarts[i].id,
          productId: createdProducts[randomProduct].id
        });
      }
    }

    //generate orders
    let createdOrders = Array(GENERATED_ORDERS);
    for (let i = 0; i < GENERATED_ORDERS; i++) {
      let randomUser = Math.floor(Math.random() * GENERATED_USERS);
      createdOrders[i] = await Order.create({
        userId: createdUsers[randomUser].id,
        status: orderStatuses[i % orderStatuses.length],
      })
    }

    //generate order items from products and carts
    for (let i = 0; i < GENERATED_ORDERS; i++) {
      let totalItems = Math.round(Math.random() * MAX_ORDERITEMS);
      for (let j = 0; j < totalItems; j++) {
        const randomProduct = Math.floor(Math.random() * GENERATED_PRODUCTS);
        await OrderItem.create({
          quantity: Math.ceil(Math.random() * 10),
          orderId: createdOrders[i].id,
          pricePaid: faker.commerce.price(1.00, 99.99, 2),
          productId: createdProducts[randomProduct].id
        });
      }
    }

  }
  catch (e) {
    console.log(chalk.red('Error in seed function'));
    console.error(e);
  }
}

module.exports = seed;

//run the seed function
seed()
  .then(() => {
    console.log(chalk.green('Database sync successful'));
    connection.close();
  })
  .catch(e => {
    console.log(chalk.red('Error seeding database'));
    console.error(e);
  })
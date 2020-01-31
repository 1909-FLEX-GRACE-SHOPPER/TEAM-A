const { expect } = require('chai')
const sinon = require('sinon')

const app = require('../server')
const agent = require('supertest')(app);
const connection = require('../db/connection')

const { Product, User } = require('../db/index')

describe('API Routes', async () => {
    //sync and destroy all tables beforeearch test
    beforeEach('clear test db', async (done) => {
        await connection.sync({ force: true })
        console.log('beforeEach hit. DB synced')
        done()
    });
    //close connection to db afterAll tests
    after('close connection', async (done) => {
        await connection.close()
        console.log('DB Closed')
        done()
    });
    //populate test DB
    const product1 = { name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 }
    const product2 = { name: 'Intelligent Plastic Mouse', inventory: 5, price: 10.00 }
    const product3 = { name: 'Generic Soft Tuna', inventory: 2, price: 55.00 }

    await Promise.all([
        Product.create(product1),
        Product.create(product2),
        Product.create(product3)
    ])
    console.log('created product');

    describe('Product Routes', () => {
        it('GET /api/product responds with all products', async () => {
            const response = await agent.get('/api/products').expect(200)
            expect(response.body).to.deep.equal([
                { name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 },
                { name: 'Intelligent Plastic Mouse', inventory: 5, price: 10.00 },
                { name: 'Generic Soft Tuna', inventory: 2, price: 55.00 }
            ]);
            expect(User.findAll.calledOnce).to.be.equal(true)
        })
    });
});
const { expect } = require('chai')
const sinon = require('sinon')

const app = require('../server')
const agent = require('supertest')(app);
const connection = require('../db/connection')

const { Product, User } = require('../db/index')

describe('API Routes', () => {
    //sync and destroy all tables beforeearch test
    beforeEach('clear test db', async (done) => {
        await connection.sync({ force: true })
        console.log('beforeEach hit. DB synced')
        done()
    })
    //close connection to db afterAll tests
    afterEach('close connection', async (done) => {
        await connection.close()
        console.log('DB Closed')
        done()
    })
    describe('/api/products Routes', async () => {
        console.log("starting Create Product")
        const product1 = { name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 }
        const product2 = { name: 'Intelligent Plastic Mouse', inventory: 5, price: 10.00 }
        const product3 = { name: 'Generic Soft Tuna', inventory: 2, price: 55.00 }

        await Promise.all([
            Product.create(product1),
            Product.create(product2),
            Product.create(product3)
        ])
        console.log('created product')
        describe('GET /api/products', () => {

            it('it responds with all products', async () => {
                const response = await agent.get('/api/products').expect(200);
                expect(response.body).to.deep.equal([
                    { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 },
                    { id: 2, name: 'Tasty Rubber Ball', inventory: 50, price: 5.00 }
                ]);
                expect(Product.findAll.calledOnce).to.be.equal(true)
            });
        })

        it('GET /api/products/productId responds with sppecified product', async () => {
            const response = await agent.get('/api/products/1').expect(200)
            expect(response.body).to.deep.equal([
                { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 }
            ]);
        })
    });

    // describe('User Routes', () => {
    //     const { findAll: userFindAll } = User;
    //     beforeEach(() => {
    //         User.findAll = sinon.spy(() => [
    //             { id: 1, firstName: 'Will', lastName: 'Smith', email: 'FreshPrince@gmail.com' },
    //             { id: 1, firstName: 'Homer', lastName: 'Simpson', email: 'donuts@gmail.com' }
    //         ]);
    //     });
    //     afterEach(() => {
    //         User.findAll = userFindAll;
    //     });
    //     it('GET /api/user responds with all users', async () => {
    //         const response = await agent.get('/api/user').expect(200)

    //         expect(response.body).to.deep.equal([
    //             { id: 1, firstName: 'Will', lastName: 'Smith', email: 'FreshPrince@gmail.com' },
    //             { id: 1, firstName: 'Homer', lastName: 'Simpson', email: 'donuts@gmail.com' }
    //         ]);
    //         expect(User.findAll.calledOnce).to.be.equal(true)
    //     })
    // })

})


const { expect } = require('chai');
const { connection }  = require('../db/');
const { Product, User } = require('../db');
const sinon = require('sinon');
const app = require('../server');
const agent = require('supertest')(app);

describe('API Routes', async() => {
    beforeEach(async() => {
        await connection.sync({ force: true });
    });

    afterEach(async() => {
        await connection.sync({ force: true });
    });
    
    describe('GET /api/products', async() => {
        const product1 = { name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 };
        const product2 = { name: 'Intelligent Plastic Mouse', inventory: 5, price: 10.00 };
        const product3 = { name: 'Generic Soft Tuna', inventory: 2, price: 55.00 };

        await Promise.all([
            Product.create(product1),
            Product.create(product2),
            Product.create(product3)
        ]);

        it('GET / responds with all products', async() => {
            const response = await agent.get('/api/products').expect(200);
            expect(response.body).to.deep.equal([
                { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 },
                { id: 2, name: 'Tasty Rubber Ball', inventory: 50, price: 5.00 }
            ]);
            expect(Product.findAll.calledOnce).to.be.equal(true);
        });

        it('GET /:productId responds with specified product', async() => {
            const response = await agent.get('/api/products/1').expect(200);
            expect(response.body).to.deep.equal([
                { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 }
            ]);
        });

    });

    describe('User Routes', async() => {
        it('GET /api/user responds with all users', async() => {
            await Promise.all([
                User.create({ firstName: 'Will', lastName: 'Smith', email: 'FreshPrince@gmail.com', password: 'abc'}),
                User.create({ firstName: 'Homer', lastName: 'Simpson', email: 'donuts@gmail.com', password: '123' }),
            ]);
            const apiResponse = await agent.get('/api/user').expect(200);
            //test goes here
            expect(true).to.equal(true);
        });
    });
});

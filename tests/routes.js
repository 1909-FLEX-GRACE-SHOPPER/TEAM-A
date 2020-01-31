const { expect } = require('chai')
const sinon = require('sinon')

const app = require('../server')
const agent = require('supertest')(app);

const { Product, User } = require('../db/index')

describe('API Routes', () => {
    describe('Product Routes', () => {
        const { findAll: productFindAll } = Product;
        beforeEach(() => {
            Product.findAll = sinon.spy(() => [
                { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 },
                { id: 2, name: 'Tasty Rubber Ball', inventory: 50, price: 5.00 }
            ]);
        });
        afterEach(() => {
            Product.findAll = productFindAll;
        });
        it('testing', () => {
            const test = 'test'
            it('does not change', () => {
                expect(test).to.equal('test')
            });
        });
        it('GET /api/products responds with all products', async () => {
            const response = await agent.get('/api/products').expect(200);
            expect(response.body).to.deep.equal([
                { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 },
                { id: 2, name: 'Tasty Rubber Ball', inventory: 50, price: 5.00 }
            ]);
            expect(Product.findAll.calledOnce).to.be.equal(true)
        });
        it('GET /api/products/productId responds with sppecified product', async () => {
            const response = await agent.get('/api/products/1').expect(200)
            expect(response.body).to.deep.equal([
                { id: 1, name: 'Tasty Cotton Pizza', inventory: 3, price: 25.00 }
            ]);
        })
    });

    describe('User Routes', () => {
        const { findAll: userFindAll } = User;
        beforeEach(() => {
            User.findAll = sinon.spy(() => [
                { id: 1, firstName: 'Will', lastName: 'Smith', email: 'FreshPrince@gmail.com' },
                { id: 1, firstName: 'Homer', lastName: 'Simpson', email: 'donuts@gmail.com' }
            ]);
        });
        afterEach(() => {
            User.findAll = userFindAll;
        });
        it('GET /api/user responds with all users', async () => {
            const response = await agent.get('/api/user').expect(200)

            expect(response.body).to.deep.equal([
                { id: 1, firstName: 'Will', lastName: 'Smith', email: 'FreshPrince@gmail.com' },
                { id: 1, firstName: 'Homer', lastName: 'Simpson', email: 'donuts@gmail.com' }
            ]);
            expect(User.findAll.calledOnce).to.be.equal(true)
        })
    })

})


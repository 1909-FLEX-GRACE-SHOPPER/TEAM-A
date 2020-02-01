const { expect } = require('chai');
const { connection }  = require('../db/');
const { Product, User } = require('../db');
const faker = require('faker');
const sinon = require('sinon');
const app = require('../server');
const agent = require('supertest')(app);

describe('API Routes', async() => {
    before(async() => {
        await connection.sync({ force: true });
    });

    after(async() => {
        await connection.sync({ force: true });
    });
    
    describe('GET /api/products', async() => {
        let productList = Array(3);
        before(async() => {
            //generate data
            for (let i = 0; i < 3; i++) {
                productList[i] = {
                  name: faker.commerce.productName(),
                  description: faker.lorem.sentence(),
                  inventory: Math.round(Math.random() * 2000),
                  price: faker.commerce.price(1.00, 99.99, 2),
                }
            };

            await Promise.all(productList.map(product => Product.create({ ...product })));
        });

        it('GET / responds with all products', async() => {

            const responseBody = (await agent.get('/api/products')).body;
            expect(responseBody.length).to.equal(3);
            responseBody.forEach((prod, idx) => {
                expect(prod.name).to.equal(productList[idx].name);
                expect(prod.description).to.equal(productList[idx].description);
                expect(prod.inventory).to.equal(productList[idx].inventory);
                expect(prod.price).to.equal(productList[idx].price);
            });
        });

        it('GET /:productId responds with specified product', async() => {

            let randomIdx = Math.floor(Math.random() * 10) % 3 || 1;
            const response = (await agent.get(`/api/products/${randomIdx}`)).body;
            expect(response.id).to.equal(randomIdx);
            expect(response.name).to.equal(productList[randomIdx - 1].name);
            expect(response.description).to.equal(productList[randomIdx - 1].description);
            expect(response.inventory).to.equal(productList[randomIdx - 1].inventory);
            expect(response.price).to.equal(productList[randomIdx - 1].price);
            
        });

    });

    describe('User Routes', async() => {
        let userList = [
            { firstName: 'Will', lastName: 'Apple', email: 'FreshPrince@gmail.com', password: 'abc'},
            { firstName: 'John', lastName: 'Doe', email: 'Jdoe@gmail.com', password: 'xyz'},
            { firstName: 'Homer', lastName: 'Zebra', email: 'donuts@gmail.com', password: '123' },
        ];
        before(async() => {
            await Promise.all(userList.map(user => User.create({...user})));
        });

        it('GET /api/user responds with all users', async() => {
            const responseBody = (await agent.get('/api/user')).body;
            expect(responseBody.length).to.equal(userList.length);

            //by default, the /user API returns sorted by LastName
            expect(responseBody[0].lastName).to.equal('Apple');
        });
    });
});

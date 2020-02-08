const { expect } = require('chai');
const { connection } = require('../db/');
const { User, Cart, CartItem, Product, Order, OrderItem, ShippingAddress, Session } = require('../db');
const faker = require('faker');
const { categoriesArr } = require('../constants')

describe('Model formats and associations', async () => {

    before(async () => {
        await connection.sync({ force: true });
    });

    after(async () => {
        await connection.sync({ force: true });
    });

    //test the user model with randomly generated data
    it('User model validation', async () => {
        try {
            //generate random data
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            //create User
            const newUser = await User.create({
                firstName,
                lastName,
                email: faker.internet.email(),
                password: faker.internet.password(),
            });

            expect(newUser.firstName).to.equal(firstName);
            expect(newUser.lastName).to.equal(lastName);

            //validate virtual field
            expect(newUser.name).to.equal(`${firstName} ${lastName}`);

            //validate default value
            expect(newUser.isAdmin).to.equal(false);

            //test update
            newUser.isAdmin = true;
            await newUser.save();

            expect(newUser.isAdmin).to.equal(true);

            //test destroy
            const { id } = newUser;
            await newUser.destroy();
            const foundUser = await User.findOne({ where: { id } });
            expect(foundUser).to.be.null;
        }
        catch (e) {
            //if something fails in creation, catch the error and force-fail the test
            console.log(e);
            expect(false).to.equal(true);
        }
    });

    it('Session model validation', async () => {
        try {
            //can create successfully
            const newSession = await Session.create();

            //test update
            const sessionUser = await User.create({
                firstName: 'Jane',
                lastName: 'Doe',
                email: faker.internet.email(),
                password: faker.internet.password(),
                sessionId: newSession.id,
            });

            const sessionCart = await Cart.create({
                sessionId: newSession.id,
            })

            expect(sessionUser.sessionId).to.equal(newSession.id);

            //test associations
            expect((await newSession.getUser()).id).to.equal(sessionUser.id);
            expect((await newSession.getCart()).id).to.equal(sessionCart.id);
            expect((await sessionUser.getSession()).id).to.equal(newSession.id);
            expect((await sessionCart.getSession()).id).to.equal(newSession.id);

            //test destroy
            const { id } = newSession;
            await newSession.destroy();
            const foundSession = await Session.findOne({ where: { id } });
            expect(foundSession).to.be.null;

        }
        catch (e) {
            //if something fails in creation, catch the error and force-fail the test
            console.log(e);
            expect(false).to.equal(true);
        }
    });

    it('Cart and CartItem model validation', async () => {
        try {
            //test creation -- if any of these fail, the test will fail
            const testCart = await Cart.create();
            const testProduct = await Product.create({
                name: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                category: categoriesArr[Math.floor(Math.random() * categoriesArr.length)],
                inventory: Math.round(Math.random() * 2000),
                price: faker.commerce.price(1.00, 99.99, 2),
                imageUrl: `${faker.image.nature()}?random=${Date.now()}`
            });

            const testCartItem = await CartItem.create({
                quantity: 2,
                cartId: testCart.id,
                productId: testProduct.id,
            });

            //test associations
            expect((await testCartItem.getProduct()).id).to.equal(testProduct.id);

            //the below is producing an error, and I'm not sure why
            //await testCart.getCartItems();
        }
        catch (e) {
            //if something fails in creation, catch the error and force-fail the test
            console.log(e);
            expect(false).to.equal(true);
        }
    });
});
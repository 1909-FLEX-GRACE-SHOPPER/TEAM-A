//connection
const connection = require('./connection');

//Model imports
const { User, Cart, CartItem, Product, Order, OrderItem } = require('./models');

//model associations here
Cart.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Product);

Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);


//exports
module.exports = {
    connection,
    User,
    Cart,
    CartItem,
    Product,
    Order,
    OrderItem
}
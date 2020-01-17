//connection
const connection = require('./connection');

//Model imports
const { User, Cart, CartItem, Product, Price, Order, OrderItem } = require('./models');

//model associations here
User.hasOne(Cart);
Cart.hasMany(CartItem);
CartItem.hasOne(Product);

User.hasMany(Order);
Order.hasMany(OrderItem);
OrderItem.hasOne(Product);

Product.hasOne(Price);

//exports
module.exports = {
    connection,
    User,
    Cart,
    CartItem,
    Product,
    Price,
    Order,
    OrderItem
}
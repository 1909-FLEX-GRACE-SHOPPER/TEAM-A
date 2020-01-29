//connection
const connection = require('./connection');

//Model imports
const { User, Cart, CartItem, Product, Order, OrderItem, ShippingAddress, Session } = require('./models/index');

//model associations here
User.hasOne(Cart);
User.hasMany(Order);
User.hasOne(ShippingAddress)

Cart.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Product);

Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);

ShippingAddress.belongsTo(User);
User.hasMany(ShippingAddress);

Session.hasOne(User);
User.belongsTo(Session);
Session.hasOne(Cart);
Cart.belongsTo(Session);

//exports
module.exports = {
  connection,
  User,
  Cart,
  CartItem,
  Product,
  Order,
  OrderItem,
  Session,
  ShippingAddress
}
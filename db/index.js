//connection
const connection = require('./connection');

//Model imports
const { User, Cart, CartItem, Product, Order, OrderItem, ShippingAddress, Session, Review } = require('./models/index');

//model associations here
User.hasOne(Cart);
User.hasMany(Order);
User.hasOne(ShippingAddress)

Cart.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Product);

Order.belongsTo(User);
Order.belongsTo(Session);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);

ShippingAddress.belongsTo(User);
User.hasMany(ShippingAddress);
ShippingAddress.belongsTo(Session);
Session.hasOne(ShippingAddress);

Session.hasOne(User);
User.belongsTo(Session);
Session.hasOne(Cart);
Cart.belongsTo(Session);

Product.hasMany(Review);
Review.belongsTo(Product);

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
  ShippingAddress,
  Review
}
//connection
const connection = require('./connection');

//Model imports
const { User, Product, Order, OrderItem, ShippingAddress, Session } = require('./models/index');

//model associations here
User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(ShippingAddress)
ShippingAddress.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Session.hasOne(User);
User.belongsTo(Session);
Session.hasOne(Order);
Order.belongsTo(Session);

//exports
module.exports = {
  connection,
  User,
  Product,
  Order,
  OrderItem,
  Session,
  ShippingAddress
}
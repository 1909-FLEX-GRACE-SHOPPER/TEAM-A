import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { singleProductReducer } from './singleProduct'
import { userReducer } from './user'
import { cartReducer } from './cart'
import { ordersByUserReducer } from './ordersByUser'
import { shippingAddressReducer } from './shippingAddress';
import { billingReducer } from './billing';
import { countReducer } from './count';

const appReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  selectedProduct: singleProductReducer,
  cart: cartReducer,
  ordersByUser: ordersByUserReducer,
  shippingAddress: shippingAddressReducer,
  billing: billingReducer,
  count: countReducer,
})

export default appReducer;
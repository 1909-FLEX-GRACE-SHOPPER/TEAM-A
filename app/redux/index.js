import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { singleProductReducer } from './singleProduct'
import { userReducer } from './user'
import { cartReducer } from './cart'
import { orderReducer } from './order'
import { shippingAddressReducer } from './shippingAddress';
import { billingReducer } from './billing';

const appReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  selectedProduct: singleProductReducer,
  cart: cartReducer,
  order: orderReducer,
  shippingAddress: shippingAddressReducer,
  billing: billingReducer,
})

export default appReducer;
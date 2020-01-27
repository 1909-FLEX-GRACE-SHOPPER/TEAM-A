import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { singleProductReducer } from './singleProduct'
import { userReducer } from './user'
import { ordersByUserReducer } from './ordersByUser'
import { shippingAddressReducer } from './shippingAddress';
import { billingReducer } from './billing';

const appReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  selectedProduct: singleProductReducer,
  ordersByUser: ordersByUserReducer,
  shippingAddress: shippingAddressReducer,
  billing: billingReducer,
})

export default appReducer;
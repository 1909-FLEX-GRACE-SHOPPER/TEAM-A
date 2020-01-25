import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { singleProductReducer } from './singleProduct'
import { userReducer } from './user'
import { cartReducer } from './cart'
import { orderReducer } from './order'
import { shippingAddressReducer } from './shippingAddress'

const appReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  selectedProduct: singleProductReducer,
  cart: cartReducer,
  order: orderReducer,
  shippingAndPaymentInfo: shippingAddressReducer,
})

export default appReducer;
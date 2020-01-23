import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { singleProductReducer } from './singleProduct'
import { userReducer } from './user'
import { cartReducer } from './cart'
import { orderReducer } from './order'

const appReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  selectedProduct: singleProductReducer,
  cart: cartReducer,
  order: orderReducer,
})

export default appReducer;
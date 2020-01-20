import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { userReducer } from './user'
import { cartReducer } from './cart'
import { cartItemsReducer } from './cartItems';

const appReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  selectedProduct: singleProductReducer,
  cart: cartReducer,
  cartItems: cartItemsReducer
})

export default appReducer
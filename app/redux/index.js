import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { userReducer } from './user'
import { cartReducer } from './cart'

const appReducer = combineReducers({
    products:productsReducer,
    user:userReducer,
    selectedProduct: singleProductReducer,
    cart: cartReducer
})

export default appReducer;
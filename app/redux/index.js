import { combineReducers } from 'redux'
import { productsReducer } from './products'
import { userReducer } from './user'

const appReducer = combineReducers({
    products:productsReducer,
    user:userReducer,
    selectedProduct: singleProductReducer,
})

export default appReducer
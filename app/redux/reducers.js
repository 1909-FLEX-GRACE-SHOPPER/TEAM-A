import { combineReducers } from 'redux'

const initialState = {
  products: [],
};

const appReducer = combineReducers({
  products: (state = initialState, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return action.products;
      default:
        return state;
    }
  }
});

export default appReducer;
import axios from 'axios';
const SET_ORDER = 'SET_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';

//action creators
const setOrder = order => {
    return {
        type: SET_ORDER,
        order
    }

};

const addOrder = newOrder => {
    return{
        type: CREATE_ORDER,
        newOrder
    }
}
const addOrderItem = orderItem => {
    return {
        type: ADD_ORDER_ITEM,
        orderItem
    }
}


//reducer
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ORDER:
            return action.order;
        case CREATE_ORDER:
            return action.newOrder;
        case ADD_ORDER_ITEM:
            return action.orderItem;
        default:
            return state;
    }
}

//thunks
export const fetchOrder = function (orderId) {
    return dispatch => {
        axios.get(`/api/order/${orderId}`)
            .then(order => dispatch(setOrder(order.data)))
            .catch(e => console.log(e));
    }
};

export const createOrder = function (newOrderId){
    return dispatch => {
        axios.post(`/api/order/`, newOrderId)
            .then(newOrder => dispatch(addOrder(newOrder.data)))
            .catch(e => console.log(e));
        }
}

export const addOrderItem = function (orderId, productId) {
    return dispatch => {
        axios.post(`/api/orderitem/`, {orderId, productId})
            .then(orderItem => dispatch(addOrderItem(orderItem.data)))
            .catch(e => console.log(e));
    }
}

export const createOrderAndAddOrderItems = function(orderId) {
    return (dispatch, getState) => {
        return dispatch(createOrder(orderId))
            .then(() => { 
                const cart = getState().cart
                const order = getState().order

                return cart.cartItems.forEach(cartItem => dispatch(addOrderItem(order.userId, cartItem.productId)))
            })
}
}


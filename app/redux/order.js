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
            return action.order;
        default:
            return state;
    }
}

//thunks
export const fetchOrder = function (orderId) {
    return dispatch => {
        axios.get(`/api/orders/${orderId}`)
            .then(order => dispatch(setOrder(order.data)))
            .catch(e => console.log(e));
    }
};

export const createOrder = function (newOrderId){
    return dispatch => {
        axios.post(`/api/orders/`, newOrderId)
            .then(newOrder => dispatch(addOrder(newOrder.data)))
            .catch(e => console.log(e));
        }
}

export const addOrderItem = function (orderId, productId) {
    return dispatch => {
        axios.post(`/api/orderItem/`, {orderId, productId})
            .then(orderItem => dispatch(addOrderItem(orderItem.data)))
            .catch(e => console.log(e));
    }
}

export const addOrderItemsToNewOrder = function(orderId) {
    return dispatch(createOOrder(orderId)). 
    then() =>{
    const fetchedOrder = getState().ordersById[orderId]
    }
    return dispatch(addOrderItems())
}

//add orderitems 
//loop through order items and add to order 
    


export cont addItemsToOrder = function (orderid) {



}

export const createOrder
//constants
const SET_BILLING = 'SET_BILLING';

const initState = '';

//action creators
export const setBilling = (billing) => {
    return {
      type: SET_BILLING,
      billing
    }
};

//reducer
export const billingReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_BILLING:
            return action.billing;
        default: 
            return state;
    }
};
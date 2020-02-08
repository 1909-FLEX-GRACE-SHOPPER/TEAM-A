import React from 'react';
import {CardElement} from 'react-stripe-elements';

const style = {
    width: "100%",
    height: "48px",  
};

const CardSection = () => {
    return (
      <label>
        Card details
        <CardElement />
      </label>
    );
  };
  
  export default CardSection;
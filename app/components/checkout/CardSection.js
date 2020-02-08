import React from 'react';
import {CardElement} from 'react-stripe-elements';

const style = {
    width: "240px",
    height: "48px",  
};

const CardSection = () => {
    return (
      <label>
        Card details
        <CardElement className="MyCardElement" style={style} />
      </label>
    );
  };
  
  export default CardSection;
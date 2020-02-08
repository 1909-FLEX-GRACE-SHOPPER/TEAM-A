import {Elements} from 'react-stripe-elements';
import React, { useState, useEffect } from 'react';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';

import CardSection from './CardSection';

const StripePaymentForm = (props) => {

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    const result = await props.stripe.createPaymentMethod({
        type: 'card',
        card: props.elements.getElement('card'),
    });
 
    const response = await axios.post('/api/checkout', { pmId: result.paymentMethod.id });
    
    //const payment_intent_client_secret = response.data;
    // this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
    //   payment_method: {
    //     card: this.props.elements.getElement('card'),
    //     billing_details: {
    //       name: 'Jenny Rosen',
    //     },
    //   }
    // });
  };

    return (
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
}

export default injectStripe(StripePaymentForm);
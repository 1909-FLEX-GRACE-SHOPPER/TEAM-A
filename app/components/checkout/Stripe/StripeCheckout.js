import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class StripeCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default StripeCheckout;
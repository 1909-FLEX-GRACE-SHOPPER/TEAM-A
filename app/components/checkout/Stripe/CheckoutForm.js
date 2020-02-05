import React from 'react';
import { injectStripe } from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const cardElement = this.props.elements.getElement('card');
    this.props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name: 'Jenny Rosen' },
      })
      .then(({ paymentMethod }) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });

    // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
      payment_method: {
        card: cardElement,
      },
    });

    // You can also use confirmCardSetup with the SetupIntents API.
    // See our confirmCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
    this.props.stripe.confirmCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', {
      payment_method: {
        card: cardElement,
      },
    });

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // With createToken, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' });
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    // With createSource, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Jenny Rosen',
      },
    });
  };

  render() {
    console.log('this.props in render: ', this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
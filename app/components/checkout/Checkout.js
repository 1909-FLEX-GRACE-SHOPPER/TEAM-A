import React from 'react';
import {connect} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchShippingAddress, updateShippingAddress } from '../../redux/shippingAddress'
import { fetchCart } from '../../redux/cart'

export class Checkout extends React.Component {
  constructor (props) {   
    super(props);
    this.state = {
      user: {},
      cart: {},
      paymentInfo: {},
      shippingAddress: props.shippingAddress,
      firstName: props.shippingAddress.firstname,
      lastName: props.shippingAddress.lastname,
      addressLine1: props.shippingAddress.line1,
      addressLine2: props.shippingAddress.line2,
      city: props.shippingAddress.city,
      state: props.shippingAddress.state,
      zip: props.shippingAddress.zip,
      country: props.shippingAddress.country,
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAddressLine1Change = this.handleAddressLine1Change.bind(this);
    this.handleAddressLine2Change = this.handleAddressLine2Change.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleCardHolderNameChange = this.handleCardHolderNameChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleExpiryDateChange = this.handleExpiryDateChange.bind(this);
    this.handleCvvChange = this.handleCvvChange.bind(this);
  }

  handleNext () {
    setActiveStep(activeStep + 1);
  };

  handleBack () {
    setActiveStep(activeStep - 1);
  };

  handleFirstNameChange (e) {
    this.setState({firstName: e.target.value})
  };

  handleLastNameChange (e) {
    this.setState({lastName: e.target.value})
  };

  handleAddressLine1Change (e) {
    this.setState({addressLine1: e.target.value})
  };

  handleAddressLine2Change (e) {
    this.setState({addressLine2: e.target.value})
  };

  handleCityChange (e) {
    this.setState({city: e.target.value})
  };

  handleStateChange (e) {
    this.setState({state: e.target.value})
  };

  handleZipChange (e) {
    this.setState({zip: e.target.value})
  };

  handleCountryChange (e) {
    this.setState({country: e.target.value})
  };

  handleCardHolderNameChange (e) {
    this.setState({cardHolderName: e.target.value})
  };

  handleCardNumberChange (e) {
    this.setState({cardNumber: e.target.value})
  };

  handleExpiryDateChange (e) {
    this.setState({expiryDate: e.target.value})
  };

  handleCvvChange (e) {
    this.setState({cvv: e.target.value})
  };

  handleClickSubmit(shippingAddress, propsHaveShippingAddress, paymentInfo, userId) {
    const isUpdate = !!propsHaveShippingAddress;
    this.props.updateShippingAddressAndPaymentInfo(shippingAddress, isUpdate, paymentInfo, userId)
  }

  componentDidMount() {
    this.props.setShippingAddress();
    this.props.loadCart();
    this.setState({shippingAddress: this.props.shippingAddress});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({shippingAddress: nextProps.shippingAddress});
    this.setState({firstName: nextProps.shippingAddress.firstname});
    this.setState({lastName: nextProps.shippingAddress.lastname});
    this.setState({addressLine1: nextProps.shippingAddress.line1});
    this.setState({addressLine2: nextProps.shippingAddress.line2});
    this.setState({city: nextProps.shippingAddress.city});
    this.setState({state: nextProps.shippingAddress.state});
    this.setState({zip: nextProps.shippingAddress.zip});
    this.setState({country: nextProps.shippingAddress.country});
    this.setState({user: nextProps.user});
    this.setState({cart: nextProps.cart});
    this.setState({paymentInfo: nextProps.paymentInfo});
  }

  render() {
    return (<div>
      {/**cart items display */}
      {/* <h2>your cart items are: </h2>
      {this.state.cart && this.state.cart.cartItems.map(item => {
        <div>
          <span></span>
        </div>
      })} */}

      {/**shipping information */}
      <h2>Enter your shipping address</h2>
      <label>First Name</label>
      <input value={this.state.firstName} onChange={(e) => this.handleFirstNameChange(e)}></input><br />
      <label>Last Name</label>
      <input value={this.state.lastName} onChange={(e) => this.handleLastNameChange(e)}></input><br />
      <label>Address Line1</label>
      <input value={this.state.addressLine1} onChange={(e) => this.handleAddressLine1Change(e)}></input><br />
      <label>Address Line2</label>
      <input value={this.state.addressLine2} onChange={(e) => this.handleAddressLine2Change(e)}></input><br />
      <label>City</label>
      <input value={this.state.city} onChange={(e) => this.handleCityChange(e)}></input><br />
      <label>State</label>
      <input value={this.state.state} onChange={(e) => this.handleStateChange(e)}></input><br />
      <label>Zip</label>
      <input value={this.state.zip} onChange={(e) => this.handleZipChange(e)}></input><br />
      <label>Country</label>
      <input value={this.state.country} onChange={(e) => this.handleCountryChange(e)}></input><br />
      
      {/*** Payment section */}
      <h2>Enter your payment informtaion</h2>
      <label>Name on the card</label>
      <input value={this.state.cardHolderName} onChange={(e) => this.handleCardHolderNameChange(e)}></input><br />
      <label>Card Number</label>
      <input value={this.state.cardNumber} onChange={(e) => this.handleCardNumberChange(e)}></input><br />
      <label>Expiry Date</label>
      <input value={this.state.expiryDate} onChange={(e) => this.handleExpiryDateChange(e)}></input><br />
      <label>cvv</label>
      <input value={this.state.cvv} onChange={(e) => this.handleCvvChange(e)}></input><br />

      {/** submit button */}
      <button type= "button" style={{color: 'white', backgroundColor: 'black'}} onClick={() => this.handleClickSubmit({firstname: this.state.firstName,
        lastname: this.state.lastName,
        line1: this.state.addressLine1,
        line2: this.state.addressLine2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country,
        userId: this.state.user.id}, 
        this.state.shippingAddress,
        {cardHolderName: this.state.cardHolderName,
          cardNumber: this.state.cardNumber,
          expiryDate: this.state.expiryDate,
          cvv: this.state.cvv
        },
        this.state.user.id)}>Submit</button>
    </div>)
  }
}

const mapState = ({ user, shippingAndPaymentInfo, cart }) => {
  return {
    user,
    cart,
    shippingAddress: shippingAndPaymentInfo.shippingAddress,
    paymentInfo: shippingAndPaymentInfo.paymentInfo,
  }
}

const mapDispatch = (dispatch, props) => {
  const { userId } = props.match.params
  return {
    loadCart: () => dispatch(fetchCart(userId)),
    setShippingAddress: () => dispatch(fetchShippingAddress(userId)),
    updateShippingAddressAndPaymentInfo: (shippingAddress, isUpdate, paymentInfo, userId) => dispatch(updateShippingAddress(shippingAddress, isUpdate, paymentInfo, userId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
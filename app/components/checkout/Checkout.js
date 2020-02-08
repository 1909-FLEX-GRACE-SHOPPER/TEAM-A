import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAndAddOrderItems } from '../../redux/ordersByUser';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Elements} from 'react-stripe-elements';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import StripePaymentForm from './StripePaymentForm';
import Review from './Review';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Review your order', 'Shipping Address', 'Confirm and Pay'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Review />;
    case 1:
      return <AddressForm />;
    case 2:
      return <StripePaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}
const Checkout = () => {
  const shippingAddress = useSelector(state => state.shippingAddress);
  const billing = useSelector(state => state.billing);
  const classes = useStyles();
  const [isDisabled, setDisabled] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [next, setNext] = React.useState(false);
  const dispatch = useDispatch();

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {    
    setActiveStep(activeStep + 1);
    setDisabled(true);
  }

  useEffect(() => {
    if (activeStep === 0) {
      setDisabled(false);
    }
    if (activeStep === 1 && shippingAddress) {
      setDisabled(false);
    }
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  We will send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Elements>
                    {getStepContent(activeStep)}
                  </Elements>
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      className={classes.button}
                      disabled={isDisabled}
                    >
                      {steps[activeStep] === 'Confirm and Pay' ? 'View Receipt' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default (Checkout)
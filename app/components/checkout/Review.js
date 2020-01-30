import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


/** BACKEND INTEGRATION PENDING HENCE FEEDING THE DATA DIRECTLY BY HARD CODING FOR NOW BELOW. WILL BE REMOVED ONCE BACKEND IS INTEGRATED */
const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['22 Main street', 'Shopperspace', 'Fullstack Town', '12345', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Master' },
  { name: 'Card holder', detail: 'Mr ABC XYZ' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-6789' },
  { name: 'Expiry date', detail: '10/2029' },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = () => {
  const classes = useStyles();
  const shippingAddress = useSelector(state => state.shippingAddress);
  const billingInfo = useSelector(state => state.billing);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const cartTotal = cart.items ? cart.items.reduce((total, item) => { return total + item.product.price }, 0) : 0;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.cartitems && cart.cartitems.map(item => (
          <ListItem className={classes.listItem} key={item.product.name}>
            <ListItemText primary={item.product.name} secondary={item.product.description} />
            <ListItemText primary={item.product.name} secondary={item.quantity} />
            <Typography variant="body2">{item.product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`$${cartTotal}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{shippingAddress.name}</Typography>
          <Typography gutterBottom>{shippingAddress.line1}</Typography>
          <Typography gutterBottom>{shippingAddress.line2}</Typography>
          <Typography gutterBottom>{shippingAddress.city}</Typography>
          <Typography gutterBottom>{shippingAddress.state}</Typography>
          <Typography gutterBottom>{shippingAddress.zip}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Typography gutterBottom>{billingInfo.cardName}</Typography>
          <Typography gutterBottom>{`Card Number: ****${billingInfo.cardNumber.slice(billingInfo.cardNumber.length - 4, billingInfo.cardNumber.length)}`}</Typography>
          <Typography gutterBottom>{`Expires: ${billingInfo.expireMonth} / ${billingInfo.expireYear}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


export default (Review)
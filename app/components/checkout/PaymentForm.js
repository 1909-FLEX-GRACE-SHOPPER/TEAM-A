import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { months, validYears } from '../../../constants';
import { setBilling } from '../../redux/billing';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const useStyles = makeStyles({
  selectMenu: {
    width: '100%',
  },
});

const PaymentForm = (props) => {
  const classes = useStyles();
  const billing = useSelector(state => state.billing);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  const [cvv, setCVV] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    axios.post('/api/checkout', { message: 'hello' });
    //dispatch(setBilling({ cardName, cardNumber, expireMonth, expireYear, cvv }));
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            value={cardName}
            onChange={(ev) => setCardName(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            value={cardNumber}
            onChange={(ev) => setCardNumber(ev.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={6}>
        <FormControl className={classes.selectMenu}>
            <InputLabel id="month-select-label">Expiry Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="expireMonth"
              name="expireMonth"
              value={expireMonth}
              fullWidth
              onChange={(ev) => setExpireMonth(ev.target.value)}
              >
                {
                  months.map(monthSymb => <MenuItem key={monthSymb} value={monthSymb}>{monthSymb}</MenuItem>)
                }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
        <FormControl className={classes.selectMenu}>
            <InputLabel id="year-select-label">Expiry Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="expireYear"
              name="expireYear"
              value={expireYear}
              fullWidth
              onChange={(ev) => setExpireYear(ev.target.value)}
              >
                {
                  validYears.map(yearSymb => <MenuItem key={yearSymb} value={yearSymb}>{yearSymb}</MenuItem>)
                }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            value={cvv}
            helperText="Last three digits on signature strip"
            onChange={(ev) => setCVV(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            style={{ width: '100%' }}
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default (PaymentForm)
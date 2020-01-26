import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postShippingAddress } from '../../redux/shippingAddress';

import { states } from '../../../constants';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const AddressForm = (props) => {
  const shippingAddress = useSelector(state => state.shippingAddress);
  const [name, setName] = useState(shippingAddress.name || '');
  const [line1, setLine1] = useState(shippingAddress.line1 || '');
  const [line2, setLine2] = useState(shippingAddress.line2 ||'');
  const [city, setCity] = useState(shippingAddress.city ||'');
  const [state, setShippingState] = useState(shippingAddress.state || 'AL');
  const [zip, setZip] = useState(shippingAddress.zip ||'');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleSubmit = () => {
    dispatch(postShippingAddress({ name, line1, line2, city, state, zip, userId: user.id }));
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            value={name}
            fullWidth
            onChange={(ev) => setName(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="line1"
            name="line1"
            label="Address line 1"
            value={line1}
            fullWidth
            onChange={(ev) => setLine1(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="line2"
            name="line2"
            label="Address line 2"
            value={line2}
            fullWidth
            onChange={(ev) => setLine2(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            fullWidth
            onChange={(ev) => setCity(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state"
              name="state"
              value={state}
              onChange={(ev) => setShippingState(ev.target.value)}
              >
                {
                  states.map(stateSymb => <MenuItem key={stateSymb} value={stateSymb}>{stateSymb}</MenuItem>)
                }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zip}
            fullWidth
            onChange={(ev) => setZip(ev.target.value)}
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

export default (AddressForm)
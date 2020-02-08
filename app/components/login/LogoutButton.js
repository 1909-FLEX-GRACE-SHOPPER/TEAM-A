import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from '../index';
import { logoutUser } from '../../redux/user';
import { fetchCart } from '../../redux/cart';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


const LogoutButton = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await dispatch(logoutUser());
    props.history.push('/');
    dispatch(fetchCart());
  }

  return (
    <div id="logout">
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSubmit}
      >
        Log Out
            </Button>
    </div>
  )
}

export default withRouter(LogoutButton);
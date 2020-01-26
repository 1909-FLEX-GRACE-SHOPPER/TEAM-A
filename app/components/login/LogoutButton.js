import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from '../index';
import { userLogout } from '../../redux/user';
import Button from '@material-ui/core/Button';

const LogoutButton = (props) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(userLogout());
        props.history.push('/');
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

export default LogoutButton;
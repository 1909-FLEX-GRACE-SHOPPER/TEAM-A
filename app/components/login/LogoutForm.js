import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from '../index';

const LogoutForm = (props) => {
    const classes = useStyles();
    return (
        <div id="logout" className={classes.root}>
            <h3 className={classes.header}>Please login to your account</h3>

        </div>
    )
}
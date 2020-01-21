import React, { useState, useEffect } from 'react';
import { createGuest } from '../../redux/user';

const SamplePage = (props) => {
    useEffect(() => {
        if (!props.user) {
            props.createGuest();
        }
    })
    
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loggedIn: state.user.isRegistered,
        name: state.user.firstName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createGuest: () => dispatch(createGuest())
    }
};
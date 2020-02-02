import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(1),
        display: "inline-block"
    },
    paper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    form: {
        width: "100%",
    },
    sharedGrid: {
        marginLeft: theme.spacing(2),
    }
}));

const Pagination = (props) => {

}

export default withRouter(Pagination);
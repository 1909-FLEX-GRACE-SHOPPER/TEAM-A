import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(1),
        display: "inline-block",
        width: "320px"
    },
    paper: {
        justifyContent: "space-evenly",
        alignItems: "stretch",
    },
    arrow: {
        flexGrow: 1,
    },
    page: {

    }
}));

const Pagination = (props) => {
    const [page, setPage] = useState(1);
    const [enabledForward, setForward] = useState(true);
    const [enabledBack, setBack] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Container component='div'>
            <CssBaseline />
            <div className={classes.paper}>
                {/* Icon back arrow */}
                {page}
                {/* Icon forward arrow */}
            </div>
        </Container>
    )
};

export default withRouter(Pagination);
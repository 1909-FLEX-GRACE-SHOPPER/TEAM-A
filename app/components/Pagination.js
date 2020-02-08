import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import { fetchCount } from '../redux/count';
import { fetchProducts } from '../redux/products';

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
    const [page, setPage] = useState(0);
    const totalProducts = useSelector(state => state.count);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleNext = () => {
        dispatch(fetchProducts(page + 1));
        setPage(page + 1);
    }

    const handleBack = () => {
        dispatch(fetchProducts(page - 1));
        setPage(page - 1);
    }

    useEffect(() => {
        if (totalProducts == null) {
            dispatch(fetchCount());
        }
        if (totalProducts && !totalPages) {
            setTotalPages(Math.ceil(totalProducts / 10));
        }
    });

    return (
        <Container component='div'>
            <CssBaseline />
            <div className={classes.paper}>
                <IconButton
                    onClick={handleBack}
                    disabled={page <= 0}
                    color='primary'
                >
                    <SkipPreviousIcon />
                </IconButton>
                {page + 1}
                <IconButton
                    onClick={handleNext}
                    color='primary'
                    disabled={page >= totalPages - 1}
                >
                    <SkipNextIcon />
                </IconButton>
            </div>
        </Container>
    )
};

export default withRouter(Pagination);
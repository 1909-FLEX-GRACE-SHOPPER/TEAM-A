import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

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
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleNext = () => {
        setPage(page + 1);
        //dispatch(fetchProducts(page - 1));
    }

    const handleBack = () => {
        setPage(page - 1);
        //dispatch(fetchProducts(page - 1));
    }

    useEffect(() => {
    });

    return (
        <Container component='div'>
            <CssBaseline />
            <div className={classes.paper}>
                <IconButton
                    onClick={handleBack}
                    disabled={page <= 1}
                    color='primary'
                >
                    <SkipPreviousIcon />
                </IconButton>
                {page}
                <IconButton
                    onClick={handleNext}
                    color='primary'
                >
                    <SkipNextIcon />
                </IconButton>
            </div>
        </Container>
    )
};

export default withRouter(Pagination);
//Placeholder for newuser registration component

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles, ErrorBar, SuccessBar } from './index';
import { addReview } from '../redux/review';
import { addRating } from '../redux/rating';
import { Link } from 'react-router-dom';

function ProductReview(props) {
  const selectedProduct = useSelector(state => state.selectedProduct);
  const user = useSelector(state => state.user);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const [submissionError, setError] = useState(false);
  const [submissionSuccess, setSuccess] = useState(false);

  const classes = useStyles();

  const handleChange = (event) => {
    switch (event.target.id) {
      case "body":
        setBody(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setError(false);
    await dispatch(addReview({ title, body, userId: user.id }, selectedProduct.id));
    if (rating) {
      await dispatch(addRating(rating, selectedProduct.id))
    }
    // TODO: setError case
    setSuccess(true)
  }

  return (
    <div id="reviewContainer" className={[classes.root, classes.centerHero].join(' ')}>
      <>
        {
          submissionSuccess ? (
            <div>
              <SuccessBar title={"Review Successfully Submitted"} message={`Thank you for leaving a review on ${selectedProduct.name}!`} />
              <Link to="/orders" variant="body2">Return to past orders</Link>
            </div>
          ) : (
              <>
                {
                  !selectedProduct.id || !user.id || user.isAdmin ? (
                    <ErrorBar title={"Unauthorized"} message={"Only logged in users who have purchased a product can leave a review on that product."} />
                  ) : (
                      <form className={classes.root}>
                        <h1 className={classes.header}>{selectedProduct.name}</h1>
                        <h3 className={classes.header}>Please submit your review below.</h3>
                        {submissionError &&
                          <ErrorBar title={"Review submission failed"} message={"Review submission failed. Please try again."} />
                        }
                        <TextField
                          id="title"
                          label="Review title"
                          variant="outlined"
                          value={title}
                          onChange={handleChange}
                          className={classes.formElem}
                        />
                        <TextField
                          id="body"
                          label="Add your review here"
                          variant="outlined"
                          value={body}
                          onChange={handleChange}
                          className={classes.formElem}
                        />
                        <Box component="fieldset" mb={3} borderColor="transparent">
                          <Typography component="legend">Please provide an optional star rating</Typography>
                          <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                              setRating(newValue);
                            }}
                          />
                        </Box>
                        <Button className={classes.formElem} variant="contained" color="primary" onClick={handleSubmit} disabled={!title || !body}>Leave Review</Button>
                      </form>
                    )
                }
              </>
            )
        }
      </>
    </div >
  )

}

export default ProductReview; 
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addCartItem } from '../redux/cart'
import { fetchProducts } from '../redux/products'
import Pagination from './Pagination';

//Material-UI
import { Card, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

//styling
const useStyles = makeStyles({
  gridStyle: {
    direction: 'row',
    justify: 'space-evenly',
    alignItems: 'center'
  },
  cardStyle: {
    margin: '1rem',
    width: '25vw',
    height: '45vh'
  },
  media: {
    height: 140,
  }
})

const ProductsList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  if (!props.products) {
    return (
      <div>
        Loading Products;
        </div>
    )
  };

  const handleChange = ev => {
    dispatch(fetchProducts(null, `&val=${ev.target.value}`))
  }

  return (
    <div>
      <Container maxWidth={"xl"}>
        <Box justifyContent="center">
      <Pagination />
        </Box>
      <TextField
        id="product-search"
        label="Search products"
        type="search"
        onChange={ev => handleChange(ev)} />
      <Grid container className={classes.gridStyle} >
        {
          props.products.map(product => {
            return (
              <Grid item md key={product.id}>
                <Card className="card" className={classes.cardStyle}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h6">
                        <Link href={`/#/products/${product.id}`}>{product.name}</Link>
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {product.price}
                      </Typography>
                      {product.numRatings > 0 &&
                        <Rating name="rating" value={Math.ceil(product.averageRating)} readOnly size="small" />
                      }
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="medium"
                      color="primary"
                      onClick={() => props.addCartItem(props.cart.id, product.id, 1)}
                      // TODO: add temporary lightbox displaying success or failure for adding to cart
                      disabled={product.quantity === 0}>
                      <AddShoppingCartIcon fontSize={"small"} style={{paddingRight:"10px"}}/>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        }
      </Grid >
      </Container>
    </div>
  );
};

const mapState = ({ products, cart }) => {
  return {
    products,
    cart,
  };
};

const mapDispatch = dispatch => {
  return {
    addCartItem: (cartId, productId, quantity) => dispatch(addCartItem(cartId, productId, quantity)),
    fetchProducts: (page, valString) => dispatch(fetchProducts(page, valString))
  }
}

export default connect(mapState, mapDispatch)(ProductsList);

//export default ProductsList;

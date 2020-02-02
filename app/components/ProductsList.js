import React from 'react';
import { connect } from 'react-redux';
import { addCartItem } from '../redux/cart'
import CheckboxesTags from './ProductFilter'

//Material-UI
import { Card, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

//styling
const useStyles = makeStyles({
  gridStyle: {
    direction: 'row',
    justify: 'space-around',
    alignItems: 'center'
  },
  cardStyle: {
    margin: '1rem',
    width: '30vw',
    height: '40vh'
  },
  media: {
    height: 140,
  },
})



const ProductsList = props => {
  const classes = useStyles();

  if (!props.products) {
    return (
      <div>
        Loading Products;
      </div>
    )
  };

  return (
    <Grid container className={classes.gridStyle}>
      <CheckboxesTags />
      {props.products.map(product => {
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
                  <Typography gutterBottom variant="h5" component="h3">
                    <Link href={`/#/products/${product.id}`}>{product.name}</Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="medium"
                  color="primary"
                  onClick={() => props.addCartItem(props.cart.id, product.id, 1)}
                  // TODO: add temporary lightbox displaying success or failure for adding to cart
                  disabled={product.quantity === 0}>
                    <AddShoppingCartIcon />           
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
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
    addCartItem: (cartId, productId, quantity) => dispatch(addCartItem(cartId, productId, quantity))
  }
}

export default connect(mapState, mapDispatch)(ProductsList);

//export default ProductsList;

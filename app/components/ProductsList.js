import React from 'react';
import { connect } from 'react-redux';
import { addCartItem } from '../redux/cart'

//Material-UI
import { Card, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

//styling
const gridStyle = {
  direction: 'row',
  justify: 'space-around',
  alignItems: 'center'
}
const cardStyle = {
  margin: '1rem',
  width: '30vw',
  height: '40vh'
}

const ProductsList = props => {
  //console.log('ProducstList PROPS****', props);
  return (
    <Grid container style={gridStyle}>
      {props.products.map(product => {
        return (
          <Grid item md key={product.id}>
            <Card className="card" style={cardStyle}>
              <CardActionArea>
                {/* Product Image will go here
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                /> */}
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
                  Add to Cart
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

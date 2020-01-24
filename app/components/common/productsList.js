import React from 'react';
import { connect } from 'react-redux';

//Material-UI
import { Card, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="medium" color="primary">
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

const mapState = state => {
  return { products: state.products };
};

export default connect(mapState)(ProductsList);

//export default ProductsList;

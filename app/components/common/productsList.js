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

const ProductsList = props => {
  //console.log('ProducstList PROPS****', props);
  return (
    <Grid 
      container
      direction='row'
      justify='space-around'
      alignItems='center'
      spacing={2}
    >
      {props.products.map(product => {
        return (
          <Grid item md key={product.id}>
            <Card className="card">
              <CardActionArea>
                {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              /> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from '../redux/products';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  sharedGrid: {
    marginLeft: theme.spacing(2),
  }
}));

export default function EditProduct(props) {
  const pageId = props.match.params.id;
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');

  useEffect(() => {
    if (products.length && !product) {
      const match = products.find(prod => prod.id == pageId);
      setProduct(match);
      setName(match.name);
      setDescription(match.description);
      setPrice(match.price);
      setInventory(match.inventory);
    }
  });

  const handlePUT = () => {
    dispatch(updateProduct({ name, description, price, inventory }, product.id));
    props.history.push(`/products/${product.id}`);
  }

  const deleteHandle = () => {
    dispatch(deleteProduct(product.id));
    props.history.push('/');
  }

  if (!product) {
    return (
      <div>
        Loading product
            </div>
    )
  }

  if (!user || !user.isAdmin) {
    return (
      <div>
        You must have administrator privileges to view this page
            </div>
    )
  }


  return (
    <Container component='div'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1">
          Edit Product
                </Typography>
        <form className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Product Name"
                variant="outlined"
                value={name}
                fullWidth
                margin="normal"
                onChange={(ev) => setName(ev.target.value)}
              >

                {name}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Product Description"
                variant="outlined"
                value={description}
                fullWidth
                margin="normal"
                onChange={(ev) => setDescription(ev.target.value)}
              >
                {description}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="price"
                label="Product Price"
                variant="outlined"
                value={price}
                margin="normal"
                onChange={(ev) => setPrice(ev.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              >
                {price}
              </TextField>
              <TextField
                id="inventory"
                label="Product Inventory"
                variant="outlined"
                value={inventory}
                margin="normal"
                className={classes.sharedGrid}
                onChange={(ev) => setInventory(ev.target.value)}
              >
                {inventory}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                margin="normal"
                onClick={handlePUT}
              >
                Update
                            </Button>
              <Button
                variant="contained"
                color="secondary"
                margin="normal"
                className={classes.sharedGrid}
                onClick={deleteHandle}
              >
                Delete Product
                            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
};
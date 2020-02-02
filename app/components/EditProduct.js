import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../redux/products';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function EditProduct(props) {
  const pageId = props.match.params.id;
  const dispatch = useDispatch();

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

  const updateHandle = () => {
    dispatch(updateProduct({ name, description, price, inventory }, product.id));
    props.history.push(`/products/${product.id}`);
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
    <div
      id="edit-form"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <h1>
        Edit Product
            </h1>
      <TextField
        id="name"
        label="Product Name"
        variant="outlined"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      >
        {name}
      </TextField>
      <TextField
        id="description"
        label="Product Description"
        variant="outlined"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      >
        {description}
      </TextField>
      <TextField
        id="price"
        label="Product Price"
        variant="outlined"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      >
        {price}
      </TextField>
      <TextField
        id="inventory"
        label="Product Inventory"
        variant="outlined"
        value={inventory}
        onChange={(ev) => setInventory(ev.target.value)}
      >
        {inventory}
      </TextField>
      <Button
        variant="outlined"
        color="primary"
        onClick={updateHandle}
      >
        Update
            </Button>
    </div>
  )
};
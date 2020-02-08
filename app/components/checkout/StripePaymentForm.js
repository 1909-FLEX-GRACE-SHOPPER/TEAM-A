import {Elements} from 'react-stripe-elements';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createOrderAndAddOrderItems } from '../../redux/ordersByUser';
import { withRouter } from 'react-router-dom';

import CardSection from './CardSection';

const StripePaymentForm = (props) => {
    const [paid, setPaid] = useState(false);
    const [pending, setPending] = useState(false);
    const dispatch = useDispatch();
    const orders = useSelector(state => state.ordersByUser)
    const cart = useSelector(state => state.cart)

    const getTotal = () => {
        let sum = 0;
        cart.cartitems.forEach(item => sum += item.product.price * item.quantity);
        return sum;
    };

    const totalCost = cart ? getTotal() : 0;

    const handleSubmit = async(ev) => {
        ev.preventDefault();
        setPending(true);
        const result = await props.stripe.createPaymentMethod({
            type: 'card',
            card: props.elements.getElement('card'),
        });

        const response = await axios.post('/api/checkout', { pmId: result.paymentMethod.id, total: totalCost });
        if (response.data.success) {
            setPaid(true);
            await dispatch(createOrderAndAddOrderItems());
            props.history.push('/orders');
        }
    };

    // useEffect(() => {
    //     if (paid) {
    //         const newOrder = orders[0];
    //         props.history.push('/rders')
    //     }
    // }, [orders])

    return (
        <form>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Payment
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <CardSection style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} >
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            style={{ width: '100%' }}
                            disabled={pending}
                            onClick={handleSubmit}
                        >
                            Confirm and Pay
                        </Button>
                    </Grid>
                    {
                        pending && 
                        <Grid item xs={12} >
                            <Typography variant="h6" gutterBottom>
                                Processing Your Order
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </React.Fragment>
        </form>
    );
}

export default withRouter(injectStripe(StripePaymentForm));
const config = require('./stripeConfig')
const stripe = require('stripe')(config.stripe.secretKey);

(async () => {
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com',
  });
  console.log('charge: ', charge)
})();
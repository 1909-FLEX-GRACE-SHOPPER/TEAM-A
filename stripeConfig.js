'use strict';

require('dotenv').config();

module.exports = {
  // Default country for the checkout form.
  country: 'US',

  // Store currency.
  currency: 'usd',

  // Supported payment methods for the store.
  paymentMethods: [
    'alipay',
    'card',
    'wechat',
  ],

  // Configuration for Stripe.
  // API Keys: https://dashboard.stripe.com/account/apikeys
  // Webhooks: https://dashboard.stripe.com/account/webhooks
  // Storing these keys and secrets as environment variables is a good practice.
  // You can fill them in your own `.env` file.
  stripe: {
    country: process.env.STRIPE_ACCOUNT_COUNTRY || 'US',
    apiVersion: '2019-12-03',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    // Setting the webhook secret is good practice in order to verify signatures.
    // After creating a webhook, click to reveal details and find your signing secret.
    // webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  // // Shipping options for the Payment Request API.
  // shippingOptions: [
  //   {
  //     id: 'free',
  //     label: 'Free Shipping',
  //     detail: 'Delivery within 5 days',
  //     amount: 0,
  //   },
  //   {
  //     id: 'express',
  //     label: 'Express Shipping',
  //     detail: 'Next day delivery',
  //     amount: 500,
  //   },
  // ],
}
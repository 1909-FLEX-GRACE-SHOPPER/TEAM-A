import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Root } from './components';
import store from './store';
import StripeScriptLoader from 'react-stripe-script-loader';
import { StripeProvider } from 'react-stripe-elements';

render(
  <Provider store={store}>
    <StripeScriptLoader
      uniqueId='myUniqueId'
      script='https://js.stripe.com/v3/'
      loader="Loading...">
      <StripeProvider apiKey='test_key'>
        <Root />
      </StripeProvider>
    </StripeScriptLoader>
  </Provider>,
  document.getElementById('main')
);

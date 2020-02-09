import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Root } from './components';
import store from './store';
import {StripeProvider} from 'react-stripe-elements';

render(
  <StripeProvider apiKey='pk_test_RsaCMDFGUWvwLrmvljwzjxhZ00OZVr3JNp'>
    <Provider store={store}>
      <Root />
    </Provider>
  </StripeProvider>,
  document.getElementById('main')
);

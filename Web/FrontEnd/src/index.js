import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// let el = document.createElement('div');
// el.setAttribute("id", "checkoutButton");
ReactDOM.render(
  <React.StrictMode>
    <img
      alt="Visa Checkout"
      class="v-button"
      role="button"
      src="https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"
    />
  </React.StrictMode>,
  document.getElementById('checkoutButton')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

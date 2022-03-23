import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import axios from 'axios';

// For GET requests
axios.interceptors.request.use(
  (req) => {
     // Add configurations here
     console.log('susccess')
     return req

  },
  (err) => {
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_expired_at');
    localStorage.removeItem('auth_token');
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {

     // Add configurations here
     console.log('susccess')
     return res
  },
  (err) => {
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_expired_at');
    localStorage.removeItem('auth_token');
  }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

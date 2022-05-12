import React from 'react';
import ReactDOM from 'react-dom';
import App from './Market/App';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './Market/redux/Store'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
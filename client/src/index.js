import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';

import { BrowserRouter } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules/store/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
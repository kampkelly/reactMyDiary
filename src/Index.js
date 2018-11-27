import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import setAuthToken from './util/AuthTokenUtil';
import './styles/style.scss';

import App from './App';
import rootReducer from './reducers/Index';

if (localStorage.diary_token) {
  setAuthToken(localStorage.diary_token);
}

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunk));

const Index = () => (
  <BrowserRouter>
    <Provider store={ store }>
      <div>
        <App />
      </div>
    </Provider>
  </BrowserRouter>
);

render(<Index/>, document.getElementById('root'));

import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';

import { Provider } from 'react-redux';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

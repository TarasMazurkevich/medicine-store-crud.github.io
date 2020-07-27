import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers';

import { render, screen } from '@testing-library/react';
 
import App from './components/App';

const store = createStore(rootReducer);

describe('Root', () => {
  test('Renders App component', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    screen.debug();
  });
});
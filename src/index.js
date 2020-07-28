// Import modules
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import firebase, { myFirestoreCollection } from './firebase';
import 'firebase/firestore';

import App from './components/App';

import { SET_MEDICINES } from './store/actions';
import rootReducer from './store/reducers';

const store = createStore(rootReducer);

firebase
  .firestore()
  .collection(myFirestoreCollection)
  .onSnapshot(snapshot => {
    const firestoreMedicines = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    store.dispatch({
      type: SET_MEDICINES,
      medicines: firestoreMedicines
    });
  });
  
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

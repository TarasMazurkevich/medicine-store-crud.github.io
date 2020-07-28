import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
}

firebase.initializeApp(firebaseConfig);

const email = process.env.REACT_APP_FIREBASE_AUTH_EMAIL;
const password = process.env.REACT_APP_FIREBASE_AUTH_PASSWORD;

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  const errorCode = error.code;
  const errorMessage = error.message;

  console.log('Error code: ', errorCode);
  console.log('Error message: ', errorMessage);
});

export const myFirestoreCollection = 'medicines_taras';

export default firebase;
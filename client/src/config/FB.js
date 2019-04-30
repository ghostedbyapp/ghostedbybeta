import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBbyk8K108Ko9KQlMx7jtjPmga2wn0IpJs",
    authDomain: "testfirebasefunctionapi.firebaseapp.com",
    databaseURL: "https://testfirebasefunctionapi.firebaseio.com",
    projectId: "testfirebasefunctionapi",
    storageBucket: "testfirebasefunctionapi.appspot.com",
    messagingSenderId: "865626238870"
  };
  const fb = firebase.initializeApp(config);
  export default fb;
  
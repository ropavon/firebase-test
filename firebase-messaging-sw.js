
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB7iE2KN8llxkUQ4NJ_MU2tj2x3DyvDSK8",
    authDomain: "testconexion-ea30e.firebaseapp.com",
    databaseURL: "https://testconexion-ea30e.firebaseio.com",
    projectId: "testconexion-ea30e",
    storageBucket: "testconexion-ea30e.appspot.com",
    messagingSenderId: "144077078483",
    appId: "1:144077078483:web:6d68273927dfbb11013926",
    measurementId: "from firebase config"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
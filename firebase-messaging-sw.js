
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

  // Your web app's Firebase configuration
  var firebaseConfig = {

    apiKey: 'AIzaSyAsISNnEisCCtkIvCagZrI0GGr3lYRuAvc',
    authDomain: 'testconnection-52d1f.firebaseapp.com',
    databaseURL: 'https://testconnection-52d1f.firebaseio.com',
    projectId: 'testconnection-52d1f',
    storageBucket: 'testconnection-52d1f.appspot.com',
    messagingSenderId: '562748345721',
    appId: '1:562748345721:web:a1b228222c051661df73a8',
    measurementId: 'from firebase config'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
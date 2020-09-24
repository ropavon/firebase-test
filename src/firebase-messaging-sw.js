// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '275244528173'
  // 'messagingSenderId': '562748345721'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler( function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  this.clients.matchAll().then(clients => {
    clients.forEach( client => client.postMessage( {
      data: 'hello from the other side (Background)'
    } ) );
  });

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

/*
messaging.onMessage( () => {
  this.clients.matchAll().then(clients => {
    clients.forEach( client => client.postMessage( {
      data: 'hello from the other side (Foreground)'
    } ) );
  });
} );
*/

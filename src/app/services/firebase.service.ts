import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  push$: Observable<any>;
  messaging;
  token: string;

  init( ) {
    // Init firebase
    this.initFirebase( );
    // Init messaging
    this.initMessaging( );
    // Return observable
    return this.push$;
  }

  initFirebase( ) {
    // Initialize Firebase
    firebase.initializeApp( environment.firebase );
  }

  initMessaging( ) {
    if ( ! this.messaging ) {
      // Retrieve Firebase Messaging object.
      this.messaging = firebase.messaging();
      // Add the public key generated from the console here.
      this.messaging.usePublicVapidKey( environment.apiKey );
      // Update Token
      this.updateToken();
      // Callback fired if Instance ID token is updated.
      this.messaging.onTokenRefresh( () => this.updateToken() );
      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      //   `messaging.setBackgroundMessageHandler` handler.
      this.messaging.onMessage( payload => {
        console.log( `Message received in onMessage. ${payload}` );
      }, () => {
        console.error( `Message error in onMessage.` );
      }, () => {
        console.log( `Message completed in onMessage.` );
      });
      // Push
      const push = new Subject();
      this.push$ = push.asObservable();
      navigator.serviceWorker.addEventListener('message', event => {
        if ( event.data && event.data[ 'firebase-messaging-msg-data' ] ) {
          push.next( event.data[ 'firebase-messaging-msg-data' ].notification );
        }
      }, false);
    }
  }

  getToken() {
    return this.token;
  }

  updateToken() {
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    this.messaging.getToken().then((currentToken) => {
      if ( currentToken ) {
        this.setToken(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // this.updateUIForPushPermissionRequired();
        this.setToken();
      }
    }).catch( err => {
      console.error('An error occurred while retrieving token. ', err);
      this.setToken();
    });
  }

  setToken( token? ) {
    console.log( `Token update: ${token}` );
    this.token = token ? token : null;
  }

}

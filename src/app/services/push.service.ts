import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() {
    firebase.initializeApp( environment.firebase );
  }

  async getToken() {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      return await messaging.getToken();
      // let uuidTemp = new DeviceUUID().get();
      // return this.saveTokenToFireStoreFromWeb(token, uuidTemp)
    } catch (e) {
      console.log(e);
    }
  }
  /*
  saveTokenToFireStoreFromWeb(token, uuid) {
    try {
       const docData = {
        token,
        device_type: 'web',
        uuid: uuid
      }
      const devicesRef = this.db.collection('devices')
      return devicesRef.doc(uuid).set(docData);
    } catch (e) {
      console.log(e, 'saveTokenError');
    }
  }
  */
  showMessage() {
    try {
      const messaging = firebase.messaging();
      messaging.onMessage( payload => {
        console.log( payload );
      });
    } catch (e) {
      console.log(e);
    }
  }
}

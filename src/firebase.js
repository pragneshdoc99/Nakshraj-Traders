import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBTtspqdloFTvFX3szMQvMbjDyTAYEw-MM",
  authDomain: "nakshraj-traders.firebaseapp.com",
  projectId: "nakshraj-traders",
  storageBucket: "nakshraj-traders.appspot.com",
  messagingSenderId: "821724665953",
  appId: "1:821724665953:web:6b27b100ab79002d08f220"
};
firebase.initializeApp(config);

export default firebase;

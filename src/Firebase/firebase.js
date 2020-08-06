import * as firebase from 'firebase';
import "firebase/auth"
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD3EGqIGqnTbTgO8jQDWLuLclJyd0s9-PA",
    authDomain: "happyornot-569d4.firebaseapp.com",
    databaseURL: "https://happyornot-569d4.firebaseio.com",
    projectId: "happyornot-569d4",
    storageBucket: "happyornot-569d4.appspot.com",
    messagingSenderId: "224112296329",
    appId: "1:224112296329:web:9bda3f5b06e1e22b3ca158",
    measurementId: "G-KYCN2LSXH2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export default firebase;
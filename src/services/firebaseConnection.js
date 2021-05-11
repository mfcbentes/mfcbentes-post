import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCJeveidWXfALgT21sED5iwEHK9Cbxjs_Q",
  authDomain: "mfcbentes-post.firebaseapp.com",
  projectId: "mfcbentes-post",
  storageBucket: "mfcbentes-post.appspot.com",
  messagingSenderId: "949631481910",
  appId: "1:949631481910:web:06a7641de14fba3e894097"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDJ5z9_PyYPvmKSJp3S-tA4RuH4-cGNTWw",
    authDomain: "dcon-1ec91.firebaseapp.com",
    databaseURL: "https://dcon-1ec91.firebaseio.com",
    projectId: "dcon-1ec91",
    storageBucket: "dcon-1ec91.appspot.com",
    messagingSenderId: "65744908023",
    appId: "1:65744908023:web:0c93093b01fd8c87fdedf2",
    measurementId: "G-JX7DQ7PBEP"
  };

  firebase.initializeApp(firebaseConfig);
  const storage=firebase.storage();

  export {storage,firebase as default}
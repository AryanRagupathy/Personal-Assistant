import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyC1gfDckiUv8p_-LyzMIy6sJgFRA8nyCrA",
    authDomain: "whitehatproject-6a8be.firebaseapp.com",
    projectId: "whitehatproject-6a8be",
    storageBucket: "whitehatproject-6a8be.appspot.com",
    messagingSenderId: "895779058858",
    appId: "1:895779058858:web:03b02bad2ee6d18b164cd3"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
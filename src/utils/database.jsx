  // Your web app's Firebase configuration
import firebase from "firebase/app";
import "firebase/firestore";

  let database = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyA4GAAJdUzjAvKmjAHmLq2E6N8FbRRH540",
      authDomain: "books-fire-store.firebaseapp.com",
      databaseURL: "https://books-fire-store.firebaseio.com",
      projectId: "books-fire-store",
      storageBucket: "books-fire-store.appspot.com",
      messagingSenderId: "940113657548",
      appId: "1:940113657548:web:b16f23eb62b7a552"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    return firebase.firestore();
  };

  export default database;


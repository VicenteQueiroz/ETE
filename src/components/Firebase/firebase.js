import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";

const config = {
  apiKey: "AIzaSyBdOD_2w7S33136fmKutKahWTxqWTCdd24",
  authDomain: "ete-app-dd535.firebaseapp.com",
  databaseURL: "https://ete-app-dd535.firebaseio.com",
  projectId: "ete-app-dd535",
  storageBucket: "ete-app-dd535.appspot.com",
  messagingSenderId: "1032299096210"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  // If you delete a user at “users/5”, the user with the identifier 5 will be removed from the database
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;

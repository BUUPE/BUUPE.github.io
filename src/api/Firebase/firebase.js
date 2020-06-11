import * as app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxBIbTYbRuqP1np-ri4YaJ0H6OYK4L46g",
  authDomain: "upe-website-fa07a.firebaseapp.com",
  databaseURL: "https://upe-website-fa07a.firebaseio.com",
  projectId: "upe-website-fa07a",
  storageBucket: "upe-website-fa07a.appspot.com",
  messagingSenderId: "896060764020",
  appId: "1:896060764020:web:6106cc98c799f998a30621",
  measurementId: "G-WS4FH73Z9Z",
};

class Firebase {
	constructor(){
		app.initializeApp(firebaseConfig);
		
		this.auth = app.auth();
		this.firestore = app.firestore();
	}
	
  // *** Auth API ***
 
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
 
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
 
  doSignOut = () => this.auth.signOut();
 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
	
	
  // *** Users API ***
  
  getEboard = () => this.firestore.collection("users").where("eboard", "==", true).orderBy("positionRank").get()
  getClass = className => this.firestore.collection("users").where("class", "==", className).orderBy("name").get()
  getEmail = email => this.firestore.collection("users").where("email", "==", email).orderBy("name").get()
  
  
  // *** Events API ***
  getEvents = () => this.firestore.collection("events").orderBy("index").get()
	
}

export default Firebase;

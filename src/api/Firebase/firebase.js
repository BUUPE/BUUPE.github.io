import * as app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

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
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.functions = app.functions();
  }

  getConfig = () => this.firestore.doc("config/general").get();

  configDoc = () => this.firestore.doc("config/general");

  generalSettings = () => this.firestore.doc("website/generalSettings");

  // *** Auth API ***

  doSignInWithToken = (token) => this.auth.signInWithCustomToken(token);

  doSignOut = () => this.auth.signOut();

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(async (snapshot) => {
            if (snapshot.exists) {
              const dbUser = snapshot.data();
              if (!dbUser.hasOwnProperty("roles")) {
                dbUser.roles = {
                  guest: true,
                };
                await this.user(authUser.uid).update(dbUser);
              }

              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
              };

              next(authUser);
            } else {
              const dbUser = {
                roles: {
                  guest: true,
                },
              };

              this.user(authUser.uid)
                .set(dbUser)
                .then(() => {
                  authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    providerData: authUser.providerData,
                    ...dbUser,
                  };

                  next(authUser);
                });
            }
          })
          .catch(console.error);
      } else {
        fallback();
      }
    });

  // *** Users API ***

  user = (uid) => this.firestore.doc(`users/${uid}`);

  getEboard = () =>
    this.firestore
      .collection("users")
      .where("roles.upemember", "==", true)
      .where("roles.eboard", "==", true)
      .orderBy("upe.positionRank")
      .get();
  getMembers = () =>
    this.firestore
      .collection("users")
      .where("roles.upemember", "==", true)
      .orderBy("name")
      .get();
  getNonMembers = () =>
    this.firestore
      .collection("users")
      .where("roles.nonmember", "==", true)
      .orderBy("name")
      .get();
  getClass = (className) =>
    this.firestore
      .collection("users")
      .where("roles.upemember", "==", true)
      .where("upe.class", "==", className)
      .orderBy("name")
      .get();

  editUser = (uid, data) =>
    this.firestore.collection("users").doc(uid).set(data, { merge: true });

  addUser = (uid, data) =>
    this.firestore.collection("users").doc(uid).set(data, { merge: true });

  deleteUser = (uid) => this.firestore.collection("users").doc(uid).delete();

  getUID = (email) => this.firestore.collection("uids").doc(email).get();

  getIdToken = () => {
    if (this.auth.currentUser) return this.auth.currentUser.getIdToken();
    else return new Promise((resolve) => resolve(null));
  };

  // *** Images API ***

  getImage = (className, fileName) =>
    this.storage
      .ref("profiles")
      .child(className)
      .child(fileName)
      .getDownloadURL();
  uploadImage = (className, fileName) =>
    this.storage.ref("profiles").child(className).child(fileName);
  delImage = (className, fileName) =>
    this.storage.ref("profiles").child(className).child(fileName).delete();

  // *** Events API ***

  getEvents = () =>
    this.firestore
      .collection("website")
      .doc("events")
      .collection("eventData")
      .orderBy("index")
      .get();

  getEvent = (index) =>
    this.firestore
      .collection("website")
      .doc("events")
      .collection("eventData")
      .where("index", "==", index)
      .orderBy("title")
      .get();

  getIndex = () => this.firestore.collection("website").doc("eventIndex").get();

  incrementIndex = (data) =>
    this.firestore
      .collection("website")
      .doc("eventIndex")
      .set(data, { merge: true });

  editEvent = (uid, data) =>
    this.firestore
      .collection("website")
      .doc("events")
      .collection("eventData")
      .doc(uid)
      .set(data, { merge: true });

  addEvent = (eventData) =>
    this.firestore
      .collection("website")
      .doc("events")
      .collection("eventData")
      .add(eventData);

  deleteEvent = (uid) =>
    this.firestore
      .collection("website")
      .doc("events")
      .collection("eventData")
      .doc(uid)
      .delete();

  // *** Functions API ***

  callFun = (funName) => this.functions.httpsCallable(funName);
}

export default Firebase;

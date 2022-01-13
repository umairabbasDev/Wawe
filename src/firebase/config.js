import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { toast } from 'react-toastify';

var firebaseConfig = {
  apiKey: "AIzaSyBGOM4gzD-yCfskEERNf8FGL4LryKt6ks4",
  authDomain: "firegram-t.firebaseapp.com",
  databaseURL: "https://firegram-t.firebaseio.com",
  projectId: "firegram-t",
  storageBucket: "firegram-t.appspot.com",
  messagingSenderId: "1051894698884",
  appId: "1:1051894698884:web:0ae01370484cc172ec43d1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const auth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    console.log(user.photoURL);
    const query = await projectFirestore
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await projectFirestore.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        img:user.photoURL
      });
    }
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await projectFirestore.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    toast("Password reset link sent!");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  projectFirestore,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  projectStorage,
  timestamp,
};

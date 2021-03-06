import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import collection from '../pages/collection/collection';

var firebaseConfig = {
    apiKey: "AIzaSyAl-GLm7V21mAH00tHBbyfZGGf2yy0X03Y",
    authDomain: "cloth-b97d2.firebaseapp.com",
    databaseURL: "https://cloth-b97d2.firebaseio.com",
    projectId: "cloth-b97d2",
    storageBucket: "cloth-b97d2.appspot.com",
    messagingSenderId: "454895440588",
    appId: "1:454895440588:web:0c8ee069e2f9e8e100e869"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(element => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, element);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  
  return transformedCollection.reduce((acc,collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
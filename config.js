import firebase from 'firebase'
require('@firebase/firestore')


var firebaseConfig = {
    apiKey: "AIzaSyAw6EQ64d47QA2qsTJpr81L-2BEofuwypE",
    authDomain: "willy-e6b95.firebaseapp.com",
    databaseURL: "https://willy-e6b95.firebaseio.com",
    projectId: "willy-e6b95",
    storageBucket: "willy-e6b95.appspot.com",
    messagingSenderId: "570971875639",
    appId: "1:570971875639:web:c82b571b7f5f72d51652b2"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();

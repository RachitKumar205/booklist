import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAmy9KQfp36T1wjbRs7-OmCVElNotV7Rys",
    authDomain: "readlist-b5c0a.firebaseapp.com",
    projectId: "readlist-b5c0a",
    storageBucket: "readlist-b5c0a.appspot.com",
    messagingSenderId: "601700443297",
    appId: "1:601700443297:web:9121e741673e9166343ce0",
    measurementId: "G-GSLKSSBBP9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const booklistsCollection = collection(db, 'booklists');

export const getBooklists = async () => {
    const snapshot = await getDocs(booklistsCollection);
    const booklists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return booklists;
};

export const saveBooklists = async (booklist) => {
    if (booklist.id) {
        await updateDoc(doc(booklistsCollection, booklist.id), booklist);
    } else {
        const docRef = await addDoc(booklistsCollection, booklist);
        booklist.id = docRef.id;
    }
};

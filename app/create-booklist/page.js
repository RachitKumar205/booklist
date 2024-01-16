'use client'

import React, { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getBooks } from '../../utils/booklists'; // Assuming a function to fetch books from Firebase

// Firebase configuration (replace with yours)
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
const booksCollection = collection(db, 'books'); // Assuming a collection for books

function CreateBooklistPage() {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await getBooks();
            setBooks(fetchedBooks);
        };
        fetchBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name && image && selectedBooks.length > 0) {
            const newBooklist = {
                id: booklistsCollection.doc().id, // Generate unique ID from Firestore
                name,
                image,
                books: selectedBooks.map((bookId) => ({ id: bookId })), // Store book IDs
            };
            await addDoc(booklistsCollection, newBooklist);
            setName('');
            setImage(null);
            setSelectedBooks([]);
        }
    };

    return (
        <div className="create-booklist-page">
            <div className="create-booklist-page">
                <h1>Create a New Booklist</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Booklist Name:</label>


                        <input

                            type="text"

                            id="name"

                            value={name}

                            onChange={(e) => setName(e.target.value)} required />
                    </div>


                    <div

                        className="form-group">


                        <label

                            htmlFor="image">Booklist Image:</label>
                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required />
                    </div>

                    {/* Book selection section (same as before) */}

                    <button type="submit">Create Booklist</button>
                </form>
            </div>

            <h2>Choose Books:</h2>
            <div className="book-selection">
                {books.map((book) => (
                    <label key={book.id}>
                        <input
                            type="checkbox"
                            value={book.id}
                            checked={selectedBooks.includes(book.id)}
                            onChange={(e) => {
                                setSelectedBooks((prevSelectedBooks) =>
                                    e.target.checked
                                        ? [...prevSelectedBooks, book.id]
                                        : prevSelectedBooks.filter((id) => id !== book.id)
                                );
                            }}
                        />
                        {book.title}
                    </label>
                ))}
            </div>

            <button type="submit">Create Booklist</button>
        </div>
    );
}

export default CreateBooklistPage;

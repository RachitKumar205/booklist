'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RootLayout from '../layout';

// database context
import { useDb } from '../../db/dbContext';

// models
import BookSchema from '@/db/models/BookSchema';
import BooklistSchema from '@/db/models/BooklistSchema';

function CreateBooklistPage() {
    const [booklistName, setBooklistName] = useState('');
    const [booklistImage, setBooklistImage] = useState(null);
    const [bookName, setBookName] = useState('');
    const [bookData, setBookData] = useState(null);
    const [error, setError] = useState(null);
    const [booksInBooklist, setBooksInBooklist] = useState([]); // New state for books in booklist

    const db = useDb();

    useEffect(() => {
        const fetchBookInfo = async () => {
            if (bookName) {
                try {
                    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);
                    setBookData(response.data.items[0]);
                    setError(null);
                } catch (error) {
                    setError('Error fetching book information');
                }
            }
        };

        fetchBookInfo();
    }, [bookName]);

    const handleAddBookToBooklist = async () => {
        try {
            // Create the book (if bookData is available)
            if (bookData) {
                const newBook = new BookSchema({
                    bookID: bookData.id,
                    title: bookData.volumeInfo.title,
                    authors: bookData.volumeInfo.authors,
                    description: bookData.volumeInfo.description,
                    image: bookData.volumeInfo.imageLinks.thumbnail,
                    read: false,
                });
                const savedBook = await newBook.save();

                // Add the book to the booksInBooklist state
                setBooksInBooklist((prevBooks) => [...prevBooks, savedBook]);
            }
        } catch (error) {
            setError('Error creating book');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create the booklist
            const newBooklist = new BooklistSchema({
                name: booklistName,
                image: booklistImage,
                books: booksInBooklist.map((book) => book._id), // Add books from state
            });
            const savedBooklist = await newBooklist.save();

            // Reset form fields and bookData
            setBooklistName('');
            setBooklistImage(null);
            setBookName('');
            setBookData(null);
            setBooksInBooklist([]); // Clear booksInBooklist
            setError(null);
        } catch (error) {
            setError('Error creating booklist or saving books');
        }
    };

    return (
        <RootLayout>
            <h1>Create a New Booklist</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="booklistName">Booklist Name:</label>
                    <input type="text" id="booklistName" value={booklistName} onChange={(e) => setBooklistName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="booklistImage">Booklist Image:</label>
                    <input type="file" id="booklistImage" onChange={(e) => setBooklistImage(e.target.files[0])} required />
                </div>
                {booksInBooklist.length > 0 && (
                    <>
                        <h2>Books in Booklist:</h2>
                        <ul>
                            {booksInBooklist.map((book) => (
                                <li key={book._id}>
                                    <img src={book.image} alt={book.title} style={{ width: '50px' }} />
                                    {book.title} by {book.authors.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Book search input and display (similar to Home page) */}
                <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="Enter book name"
                />
                {error && <p className="error">{error}</p>}
                {bookData && (
                    <div>
                        <h2>{bookData.volumeInfo.title}</h2>
                        <p>{bookData.volumeInfo.authors}</p>
                        {bookData && bookData.volumeInfo.imageLinks ? (
                            <img src={bookData.volumeInfo.imageLinks.thumbnail} alt={bookData.volumeInfo.title} />
                        ) : (
                            <p>Loading book image...</p>
                        )}
                        <p>{bookData.volumeInfo.description}</p>
                        <button type="button" onClick={() => {
                            // Add book to booklist (implementation logic here)
                        }}>Add Book to Booklist</button>

                    </div>
                )}

                <button type="submit">Create Booklist</button>
            </form>
        </RootLayout>
    );
}

export default CreateBooklistPage;

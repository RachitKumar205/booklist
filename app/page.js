'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RootLayout from './layout';

// database context
import { useDb } from '../data/dbContext';

// models
import BookSchema from '@/db/models/BookSchema';

function Home() {
    const [bookName, setBookName] = useState('');
    const [bookData, setBookData] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <RootLayout>
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
                    <img src={bookData.volumeInfo.imageLinks.thumbnail} alt={bookData.volumeInfo.title} />
                    <p>{bookData.volumeInfo.description}</p>
                </div>
            )}
        </RootLayout>
    );
}

export default Home;

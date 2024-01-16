import mongoose from 'mongoose';

/**
 * BookSchema
 * 
 * A book contains the fields:
 * - bookID (UUID): unique identifier for the book
 * - title (String): title of the book
 * - authors (String[]): list of authors of the book
 * - description (String): description of the book
 * - image (String): URL of the book cover image
 * - read (Boolean): whether the book has been read
 */

const BookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,

    },
    authors: {
        type: [String],
        required: true,
        minLength: 1,
        maxLength: 64,
        default: ['Unknown Author'],
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1024,
        default: 'No description available.',
    },
    image: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 1024,
        default: 'https://via.placeholder.com/150',
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export default mongoose.model('Book', BookSchema);
import mongoose from 'mongoose';

const BooklistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
        unique: true,
    },
    image: {
        type: String,
        required: false,
        minLength: 1,
        maxLength: 1024,
        default: 'https://via.placeholder.com/150',
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // References the Book model
        required: true,
    }],
});

export default mongoose.model('Booklist', BooklistSchema);

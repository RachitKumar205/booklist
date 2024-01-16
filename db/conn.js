import mongoose from 'mongoose';

// connect once, use everywhere
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    cachedDb = connection;

    return connection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message} for ${process.env.MONGODB_URI}`);
  }
};

export default connectDB;

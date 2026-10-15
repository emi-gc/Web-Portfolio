import mongoose from 'mongoose';

export const connectDB = async (uri = process.env.MONGODB_URL) => {
    if (!uri) {
        throw new Error('MongoDB connection URL is missing. Set MONGODB_URL or DB_USER and DB_PASSWORD.');
    }

    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
};

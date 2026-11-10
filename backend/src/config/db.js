import mongoose from 'mongoose';
import env from './env.js';

/** Connects to MongoDB. The process exits if the database cannot be reached. */
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`✔ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('✖ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;

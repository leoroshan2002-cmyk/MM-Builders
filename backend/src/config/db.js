import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mm_builders';
  const conn = await mongoose.connect(mongoUri);
  console.log(`✔ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
};

export default connectDB;

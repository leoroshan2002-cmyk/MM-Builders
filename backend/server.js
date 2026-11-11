import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const port = Number(process.env.PORT) || 5000;
const nodeEnv = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  console.log(`✔ MM Builders API running on port ${port} (${nodeEnv})`);
});

connectDB().catch((error) => {
  console.error('✖ MongoDB connection failed; API is running without database access:', error.message);
});

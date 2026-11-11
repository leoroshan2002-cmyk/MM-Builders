import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import env from './src/config/env.js';

app.listen(env.port, () => {
  console.log(`✔ MM Builders API running on port ${env.port} (${env.nodeEnv})`);
});

connectDB().catch((error) => {
  console.error('✖ MongoDB connection failed; API is running without database access:', error.message);
});

import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import env from './src/config/env.js';

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`✔ MM Builders API running on http://localhost:${env.port} (${env.nodeEnv})`);
  });
};

start();

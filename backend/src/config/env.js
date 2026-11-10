// One place to read environment variables, with safe defaults for local work.
const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mm_builders',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  adminApiKey: process.env.ADMIN_API_KEY || '',
};

export default env;

// One place to read environment variables, with safe defaults for local work.
const clientOrigins = [...new Set(
  (process.env.CLIENT_ORIGIN || 'mm-builders-seven.vercel.app')
    .split(',')
    .map((value) => {
      const origin = value.trim();
      if (!origin) return '';

      try {
        return new URL(origin).origin;
      } catch {
        throw new Error(`Invalid CLIENT_ORIGIN value: "${origin}"`);
      }
    })
    .filter(Boolean)
)];

if (clientOrigins.length === 0) {
  throw new Error('CLIENT_ORIGIN must contain at least one valid frontend origin');
}

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mm_builders',
  clientOrigins,
  adminApiKey: process.env.ADMIN_API_KEY || '',
};

export default env;

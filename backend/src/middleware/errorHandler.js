// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'Something went wrong';
  let details = err.details;

  // Mongoose validation error -> 400 with a readable list
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => e.message);
  }
  // Bad ObjectId etc.
  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}`;
  }

  if (status >= 500) console.error(err);

  res.status(status).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...((process.env.NODE_ENV || 'development') !== 'production' && status >= 500
      ? { stack: err.stack }
      : {}),
  });
}

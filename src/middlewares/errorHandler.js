
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something is wrong!',
    error: err.message,
    status: 500
  });
}

export default errorHandler;

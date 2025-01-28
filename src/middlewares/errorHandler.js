
const errorHandler = ({err, res}) => {
  console.error(err);
  res.status(500).json({
    message: 'Something is wrong!',
    error: err.message,
    status: 500
  });
}

export default errorHandler;

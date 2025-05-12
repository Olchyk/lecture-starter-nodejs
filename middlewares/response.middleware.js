const responseMiddleware = (req, res, next) => {
  if (res.err) {
    res.status(res.statusCode || 400).json({
      error: true,
      message: res.err.message || 'Something went wrong',
    });
  } else if (res.data !== undefined) {
    res.status(200).json(res.data);
  } else {
    res.status(404).json({
      error: true,
      message: 'Not found',
    });
  }
};

export { responseMiddleware };

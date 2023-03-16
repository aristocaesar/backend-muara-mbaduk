// Error-handling middleware
exports.SyntaxError = function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({
      code: 400,
      status: 'BAD_REQUEST',
      errors: {
        message: 'Invalid JSON',
      },
    });
  } else {
    next();
  }
};

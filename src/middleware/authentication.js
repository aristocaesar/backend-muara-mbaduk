exports.Authentication = function (req, res, next) {
  // res.status(401).json({
  //   code: 401,
  //   message: 'Unauthorized',
  // });
  next();
};

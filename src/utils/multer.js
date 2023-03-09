const multer = require('multer');

/**
 * Multer configuration
 * @param {string} path ./src/public/
 * @returns
 */
const multerStorage = function (path) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./src/public/${path}`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname.replace(/ /g, ''));
    },
  });
};

const handleErrors = function (err, res) {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      code: 400,
      status: 'BAD REQUEST',
      message: `${err.message} - ${err.field}`,
    });
  } else {
    res.status(400).json({
      code: 400,
      status: 'BAD REQUEST',
      message: 'Something went wrong',
    });
  }
};

exports.uploadProduct = function (req, res, next) {
  const upload = multer({
    storage: multerStorage('images/products'),
    limits: {
      fieldSize: 2 * 1000 * 1000,
    },
  }).single('image');
  upload(req, res, (err) => {
    if (err) {
      handleErrors(err, res);
    } else {
      next();
    }
  });
};

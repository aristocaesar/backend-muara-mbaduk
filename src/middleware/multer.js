const multer = require('multer');
const { UploadService } = require('../domains/upload/upload.services');

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
      cb(null, `${Date.now()}-${UploadService.filename(file.originalname)}`);
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

exports.upload = function (req, res, next) {
  const upload = multer({
    storage: multerStorage('uploads/'),
    limits: {
      fieldSize: 2 * 1000 * 1000,
    },
  }).array('file', 10);
  upload(req, res, (err) => {
    if (err) {
      handleErrors(err, res);
    } else {
      next();
    }
  });
};

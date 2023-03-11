const { Router } = require('express');
const { UploadController } = require('./upload.controller');
const { upload } = require('../../utils/multer');

const router = Router();

router.get('/', UploadController.get);
router.post('/', upload, UploadController.store);
router.delete('/', UploadController.delete);

module.exports = { uploadRoutes: router };

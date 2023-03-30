const { Router } = require('express');
const { UploadController } = require('./upload.controllers');
const { upload } = require('../../utils/multer');

const router = Router();

router.get('/', UploadController.get);
router.post('/', upload, UploadController.store);
router.get('/:id', UploadController.getById);
router.delete('/:filename', UploadController.delete);

module.exports = { uploadRoutes: router };

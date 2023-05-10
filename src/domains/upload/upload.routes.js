const { Router } = require('express');
const { UploadController } = require('./upload.controllers');
const { upload } = require('../../middleware/multer');

const router = Router();

router.get('/', UploadController.get);
router.post('/', upload, UploadController.store);
router.get('/:name', UploadController.getByName);
router.delete('/:filename', UploadController.delete);

module.exports = { uploadRoutes: router };

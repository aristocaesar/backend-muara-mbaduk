const { UploadService } = require('./upload.services');

class UploadController {
  static async get(req, res, next) {
    try {
      const uploads = await UploadService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: uploads,
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        status: 'BAD_REQUEST',
        errors: {
          message: error.message,
        },
      });
    }
  }

  static async getById(req, res, next) {
    try {
      const uploads = await UploadService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: uploads,
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        status: 'BAD_REQUEST',
        errors: {
          message: error.message,
        },
      });
    }
  }

  static async store(req, res, next) {
    try {
      const uploaded = await UploadService.store(req);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: uploaded,
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        status: 'BAD_REQUEST',
        errors: {
          message: error.message,
        },
      });
    }
  }

  static async delete(req, res, next) {
    try {
      const deleted = await UploadService.delete(req);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: deleted,
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        status: 'BAD_REQUEST',
        errors: {
          message: error.message,
        },
      });
    }
  }
}

module.exports = { UploadController };

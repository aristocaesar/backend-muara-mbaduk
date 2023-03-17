const { UploadService } = require('./upload.services');

class UploadController {
  /**
   * Get all file uploaded
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
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

  /**
   * Get file uploaded by id
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getById(req, res, next) {
    try {
      const upload = await UploadService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: upload,
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

  /**
   * Store file
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
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

  /**
   * Delete file uploaded
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await UploadService.delete(req.params.filename);
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

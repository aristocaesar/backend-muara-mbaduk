const { NewsService } = require('./news.services');

class NewsController {
  /**
   * Controller get all news
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async get(req, res, next) {
    try {
      const news = await NewsService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: news,
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
   * Controller get news by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getById(req, res, next) {
    try {
      const news = await NewsService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: news,
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
   * Controller store news
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async store(req, res, next) {
    try {
      const stored = await NewsService.store(req.body);
      res.status(201).json({
        code: 201,
        status: 'OK',
        data: stored,
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
   * Controller update news
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async update(req, res, next) {
    try {
      const updated = await NewsService.update(req.params.id, req.body);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: updated,
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
   * Controller delet news
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await NewsService.delete(req.params.id);
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

module.exports = { NewsController };

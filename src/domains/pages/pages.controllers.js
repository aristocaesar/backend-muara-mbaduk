const { PageService } = require('./pages.services');

class PagesController {
  /**
   * Controller get pages
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async get(req, res, next) {
    try {
      const pages = await PageService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: pages,
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
   * Controller get page by id or slug
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getByIdOrSlug(req, res, next) {
    try {
      const page = await PageService.getByIdOrSlug(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: page,
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
   * Controller store page
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async store(req, res, next) {
    try {
      const stored = await PageService.store(req.body);
      console.log(stored);
      res.status(200).json({
        code: 200,
        status: 'CREATED',
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
   * Controller update page
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async update(req, res, next) {
    try {
      const updated = await PageService.update(req.params.id, req.body);
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
   * Controller delete page
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await PageService.delete(req.params.id);
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

module.exports = { PagesController };

const { ReviewService } = require('./review.services');

class ReviewController {
  /**
   * Controller get all review
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async get(req, res, next) {
    try {
      const reviews = await ReviewService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: reviews,
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
   * Controller get review by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getById(req, res, next) {
    try {
      const review = await ReviewService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: review,
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
   * Controller get review by package
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getByPackage(req, res, next) {
    try {
      const reviews = await ReviewService.getByPackage(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: reviews,
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
   * Controller get review by payment
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getByPayment(req, res, next) {
    try {
      const reviews = await ReviewService.getByPayment(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: reviews,
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
   * Controller store review
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async store(req, res, next) {
    try {
      const stored = await ReviewService.store(req.body);
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
   * Controller update review
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async update(req, res, next) {
    try {
      const updated = await ReviewService.update(req.params.id, req.body);
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
   * Controller delete review
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await ReviewService.delete(req.params.id);
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

module.exports = { ReviewController };

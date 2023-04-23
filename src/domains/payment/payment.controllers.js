const { PaymentService } = require('./payment.services');

class PaymentController {
  /**
   * Controller get all payment
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async get(req, res, next) {
    try {
      const payments = await PaymentService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: payments,
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
   * Controller get payment by id or order id
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getById(req, res, next) {
    try {
      const payment = await PaymentService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: payment,
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
   * Controller get payment by user
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getByUser(req, res, next) {
    try {
      const payment = await PaymentService.getByUser(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: payment,
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
   * Controller checkout service
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async checkout(req, res, next) {
    try {
      const checkout = await PaymentService.checkout(req.params.type, req.body);
      res.status(201).json({
        code: 201,
        status: 'OK',
        data: checkout,
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
   * Controller notification service
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async notification(req, res, next) {
    try {
      const notification = await PaymentService.notification(req.body);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: notification,
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
   * Controller update status transaction
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async changeStatus(req, res, next) {
    try {
      const changeStatus = await PaymentService.updateStatus(req.body);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: changeStatus,
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

module.exports = { PaymentController };

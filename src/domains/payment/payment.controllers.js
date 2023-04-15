const { PaymentService } = require('./payment.services');

class PaymentController {
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
}

module.exports = { PaymentController };

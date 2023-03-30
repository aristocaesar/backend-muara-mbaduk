const { TicketService } = require('./ticket.services');

class TicketController {
  /**
   * Controller get all ticket
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async get(req, res, next) {
    try {
      const tickets = await TicketService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: tickets,
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
   * Controller get ticket by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getById(req, res, next) {
    try {
      const ticket = await TicketService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: ticket,
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
   * Controller get ticket by category
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getByCategory(req, res, next) {
    try {
      const tickets = await TicketService.getByCategory(req.params.category);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: tickets,
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
   * Controller store ticket
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async store(req, res, next) {
    try {
      const stored = await TicketService.store(req.body);
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
   * Controller update ticket
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async update(req, res, next) {
    try {
      const updated = await TicketService.update(req.params.id, req.body);
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
   * Controller delete ticket
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await TicketService.delete(req.params.id);
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

module.exports = { TicketController };

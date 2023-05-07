const { AdminService } = require('./admin.services');

class AdminController {
  /**
   * Controller get all administartor
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async get(req, res, next) {
    try {
      const admins = await AdminService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: admins,
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
   * Controller get all administartor
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getById(req, res, next) {
    try {
      const admin = await AdminService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: admin,
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
   * Controller get administartor by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async store(req, res, next) {
    try {
      const stored = await AdminService.store(req.body);
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
   * Controller update administartor by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async update(req, res, next) {
    try {
      const updated = await AdminService.update(req.params.id, req.body);
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
   * Controller delete administartor by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await AdminService.delete(req.params.id);
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

  /**
   * Controller update email administartor
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async updateEmail(req, res, next) {
    try {
      const updatedEmail = await AdminService.updateEmail(
        req.params.id,
        req.body
      );
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: updatedEmail,
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
   * Controller update password administartor
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async updatePassword(req, res, next) {
    try {
      const updatedPassword = await AdminService.updatePassword(
        req.params.id,
        req.body
      );
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: updatedPassword,
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
   * Controller login administartor
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async signIn(req, res, next) {
    try {
      const logined = await AdminService.signIn(req.body);
      if (logined == 'Email atau password salah') {
        res.status(401).json({
          code: 401,
          status: 'UNAUTORIZED',
          data: logined,
        });
      } else {
        res.status(200).json({
          code: 200,
          status: 'OK',
          data: logined,
        });
      }
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

module.exports = { AdminController };

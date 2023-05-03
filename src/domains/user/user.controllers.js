const { UserService } = require('./user.service');

class UserController {
  /**
   * Controller get all user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async get(req, res, next) {
    try {
      const users = await UserService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: users,
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
   * Controller get user by id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: user,
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
   * Controller login user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async login(req, res, next) {
    try {
      const logined = await UserService.login(req.body.token);
      res.cookie('MUARA_MBADUK', logined.token, {
        maxAge: 604800000,
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      });
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: logined.user,
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
   * Controller verify token user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async account(req, res, next) {
    try {
      const account = await UserService.account(req.cookies);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: account,
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
   * Controller change access user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async changeAccess(req, res, next) {
    try {
      const updated = await UserService.changeAccess(req.params.id, req.body);
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
   * Controller logout user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  static async logout(req, res, next) {
    try {
      res.clearCookie('MUARA_MBADUK');
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: 'LOGOUT',
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

module.exports = { UserController };

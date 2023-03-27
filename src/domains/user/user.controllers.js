const { UserService } = require('./user.service');

class UserController {
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

  static async login(req, res, next) {
    try {
      const logined = await UserService.login(req.body.token);
      res.cookie('MUARA_MBADUK', logined.token, {
        maxAge: 604800000,
        httpOnly: true,
        secure: true,
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

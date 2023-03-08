const { TestimonyService } = require('./testimony.service');

class TestimonyController {
  static async get(req, res, next) {
    try {
      const testimonys = await TestimonyService.getAll();
      res.status(200).json(testimonys);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error,
      });
    }
  }
}

module.exports = { TestimonyController };

const { ProductsService } = require('./product.services');

class ProductController {
  static async get(req, res, next) {
    try {
      const products = await ProductsService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: products,
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
      const product = await ProductsService.getById(req.params.id);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: product,
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

  static async store(req, res, next) {
    try {
      console.log(req.files);
      // const product = await ProductsService.store(req);
      res.status(201).json({
        code: 201,
        status: 'OK',
        data: req.body,
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

  static async update(req, res, next) {}

  static async delete(req, res, next) {}
}

module.exports = { ProductController };

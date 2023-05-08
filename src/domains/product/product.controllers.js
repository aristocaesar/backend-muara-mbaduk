const { ProductsService } = require('./product.services');

class ProductController {
  /**
   * Controller Get Product
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
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

  /**
   * Controller Get Product By Id
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getBySlug(req, res, next) {
    try {
      const product = await ProductsService.getBySlug(req.params.slug);
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

  /**
   * Controller search Product
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async search(req, res, next) {
    try {
      const products = await ProductsService.search(req.query);
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

  /**
   * Controller Store Product
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async store(req, res, next) {
    try {
      const created = await ProductsService.store(req.body);
      res.status(201).json({
        code: 201,
        status: 'OK',
        data: created,
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
   * Controller Update Product
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async update(req, res, next) {
    try {
      const updated = await ProductsService.update(req.params.slug, req.body);
      res.status(200).json({
        code: 201,
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
   * Controller Get Product
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await ProductsService.delete(req.params.slug);
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

module.exports = { ProductController };

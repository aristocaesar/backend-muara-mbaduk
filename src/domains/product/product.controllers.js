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
      const products = await ProductsService.get(req.query);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: products.items,
        page: {
          size: products.length,
          total: products.total,
          total_pages: products.total_pages,
          current: products.current,
        },
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
      const updated = await ProductsService.update(req.params.id, req.body);
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
      const deleted = await ProductsService.delete(req.params.id);
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

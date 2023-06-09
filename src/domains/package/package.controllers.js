const { PackageService } = require('./package.services');

class PackageController {
  /**
   * Controller get packages
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async get(req, res, next) {
    try {
      const packages = await PackageService.get();
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: packages,
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
   * Controller get package by slug
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getBySlug(req, res, next) {
    try {
      const packages = await PackageService.getBySlug(req.params.slug);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: packages,
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
   * Controller get package by category
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getByCategory(req, res, next) {
    try {
      const packages = await PackageService.getByCategory(req.params.category);
      res.status(200).json({
        code: 200,
        status: 'OK',
        data: packages,
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
   * Controller get all products that are not available in the package
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async getProductNotAvaible(req, res, next) {
    try {
      const products = await PackageService.getProductNotAvaible(req.params.id);
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
   * Controller store package
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async store(req, res, next) {
    try {
      const stored = await PackageService.store(req.body);
      res.status(200).json({
        code: 200,
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
   * Controller store package
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async update(req, res, next) {
    try {
      const updated = await PackageService.update(req.params.slug, req.body);
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
   * Controller delete package by slug
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await PackageService.delete(req.params.id);
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
   * Controller store product to package
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async storeProduct(req, res, next) {
    try {
      const stored = await PackageService.storeProduct(
        req.params.slug,
        req.body
      );
      res.status(200).json({
        code: 200,
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
   * Controller update product in package by id
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async updateProductQuantity(req, res, next) {
    try {
      const stored = await PackageService.updateProductQuantity(
        req.params.slug,
        req.params.id,
        req.body
      );
      res.status(200).json({
        code: 200,
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
   * Controller delete product in package by id
   * @param {Request} req
   * @param {Response} res
   * @param {Next} next
   */
  static async deleteProduct(req, res, next) {
    try {
      const deleted = await PackageService.deleteProduct(req.params);
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

module.exports = { PackageController };

const { knex } = require('../../config/database');
const { Product } = require('./product.model');
const { v4: uuidv4 } = require('uuid');

class ProductsService {
  /**
   * Get all products
   */
  static async get() {
    return await knex
      .select()
      .table('products')
      .then((rows) => {
        return rows.map((product) => new Product(product).toJson());
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Get product by id
   * @param {string} id
   */
  static async getById(id) {
    return await knex('products')
      .where('id', id)
      .first()
      .then((row) => {
        if (row != undefined) return new Product(row).toJson();
        return [];
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Store product to database
   * @param {Request} req
   * @returns
   */
  static async store(req) {
    Product.validate(req);
    if (req.file == undefined) throw new Error('Gambar produk harus terisi');
    const { filename } = req.file;
    const image = `${process.env.APP_URI}/static/images/products/${filename}`;

    let { id = uuidv4(), title, description, price, fines_broken } = req.body;
    return await knex
      .insert({ id, title, description, image, price, fines_broken })
      .into('products')
      .then(() => {
        (price = parseInt(price)), (fines_broken = parseInt(fines_broken));
        return { id, title, description, image, price, fines_broken };
      })
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY') {
          throw new Error('Produk ini sudah tersedia');
        }
        throw new Error(error.message);
      });
  }

  static async update() {}

  static async delete() {}
}

module.exports = { ProductsService };

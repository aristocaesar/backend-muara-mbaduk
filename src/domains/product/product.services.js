const { knex } = require('../../config/database');
const { Product } = require('./product.model');
const { v4: uuidv4 } = require('uuid');
const { ProductValidate } = require('./product.validate');

class ProductsService {
  /**
   * Service Get all products
   */
  static async get() {
    return await knex
      .select()
      .table('products')
      .then((rows) => {
        return rows.map((product) => new Product(product).toJson());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service Get product by id
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
        throw new Error(error);
      });
  }

  /**
   * Service Store product
   * @param {Request} req
   * @returns
   */
  static async store(body) {
    ProductValidate.valid(body);

    let {
      id = uuidv4(),
      title,
      description,
      image,
      price,
      fines_broken,
    } = body;
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

  /**
   * Service Update product
   * @param {String} id
   * @param {Object} body
   * @returns
   */
  static async update(id, body) {
    ProductValidate.valid(body);

    return await knex('products')
      .where({ id })
      .update(body)
      .then((rowCount) => {
        if (rowCount === 0) {
          throw 'Id atau produk tersebut tidak tersedia';
        }
        return new Product(body).toJson();
      })
      .catch((err) => {
        if (err.code == 'ER_DUP_ENTRY') {
          throw new Error('Produk ini sudah tersedia');
        }
        throw new Error(err);
      });
  }

  /**
   * Service Delete product
   * @param {String} id
   * @returns
   */
  static async delete(id) {
    return await knex('products')
      .where({ id })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau produk tersebut tidak tersedia';
        return 'Produk berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { ProductsService };

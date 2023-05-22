const { knex } = require('../../config/database');
const { Product } = require('./product.model');
const { v4: uuidv4 } = require('uuid');
const { ProductValidate } = require('./product.validate');

class ProductsService {
  /**
   * Service Get all products
   */
  static async get(query) {
    const search = query.search == undefined ? '' : query.search;
    const limit =
      query.limit == '' || query.limit < 0 || query.limit == undefined
        ? 20
        : query.limit;
    const current =
      query.current == '' || query.current <= 0 || query.current == undefined
        ? 1
        : query.current;

    let products = {
      items: [],
      length: 0,
      total: 0,
      total_pages: 0,
      current: parseInt(current) > 0 ? parseInt(current) : 0,
    };

    if (products.current <= 0) return products;

    products.total = await knex('products')
      .count('* as total')
      .first()
      .then((rows) => rows.total);

    const totalPages = Math.ceil(products.total / limit);
    products.total_pages = totalPages == Infinity ? 0 : totalPages;

    products.items = await knex('products')
      .select()
      .where('title', 'like', `%${search}%`)
      .offset((current - 1) * limit)
      .limit(limit)
      .then((rows) => {
        return rows.map((product) => new Product(product).toJson());
      });

    products.length = products.items.length;

    return products;
  }

  /**
   * Service Get product by id
   * @param {string} id
   */
  static async getById(id) {
    return await knex('products')
      .where('id', id)
      .orWhere('slug', id)
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
      slug,
      description,
      image,
      price,
      compensation,
    } = body;
    return await knex
      .insert({ id, title, slug, description, image, price, compensation })
      .into('products')
      .then(() => {
        (price = parseInt(price)), (compensation = parseInt(compensation));
        return { id, title, slug, description, image, price, compensation };
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
  static async update(slug, body) {
    ProductValidate.valid(body);

    return await knex('products')
      .where({ slug })
      .orWhere('id', slug)
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
  static async delete(slug) {
    return await knex('products')
      .where({ slug })
      .orWhere('id', slug)
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

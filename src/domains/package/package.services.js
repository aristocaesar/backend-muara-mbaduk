const { knex } = require('../../config/database');
const { Package } = require('./package.models');
const { v4: uuid } = require('uuid');
const _ = require('lodash');
const { PackageValidate } = require('./package.validate');

class PackageService {
  /**
   * Service get packages
   * @returns
   */
  static async get() {
    return await knex('packages')
      .select(
        'packages.*',
        'packages_detail.id as product_id',
        'packages_detail.product as product_title',
        'packages_detail.quantity as product_quantity',
        'products.image as product_image'
      )
      .leftJoin('packages_detail', 'packages.title', 'packages_detail.package')
      .leftJoin('products', 'products.title', 'packages_detail.product')
      .orderBy('packages.created_at')
      .then((packages) => {
        return _(packages)
          .groupBy('title')
          .map((groupRows) => ({
            id: groupRows[0].id,
            title: groupRows[0].title,
            slug: groupRows[0].slug,
            summary: groupRows[0].summary,
            category: groupRows[0].category,
            description: groupRows[0].description,
            price: groupRows[0].price,
            image: groupRows[0].image,
            products:
              groupRows[0].product_id == null
                ? []
                : _.map(
                    groupRows,
                    ({
                      product_id,
                      product_title,
                      product_quantity,
                      product_image,
                    }) => ({
                      id: product_id,
                      title: product_title,
                      quantity: product_quantity,
                      image: product_image,
                    })
                  ),
            created_at: groupRows[0].created_at,
            updated_at: groupRows[0].updated_at,
          }));
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get package by slug
   * @param {String} slug
   * @returns
   */
  static async getBySlug(slug) {
    return knex('packages')
      .select(
        'packages.*',
        'packages_detail.id as product_id',
        'packages_detail.product as product_title',
        'packages_detail.quantity as product_quantity',
        'products.image as product_image'
      )
      .where('packages.slug', '=', slug)
      .leftJoin('packages_detail', 'packages.title', 'packages_detail.package')
      .leftJoin('products', 'products.title', 'packages_detail.product')
      .then((packages) => {
        const result = _(packages)
          .groupBy('title')
          .map((groupRows) => ({
            id: groupRows[0].id,
            title: groupRows[0].title,
            slug: groupRows[0].slug,
            summary: groupRows[0].summary,
            category: groupRows[0].category,
            description: groupRows[0].description,
            price: groupRows[0].price,
            image: groupRows[0].image,
            products:
              groupRows[0].product_id == null
                ? []
                : _.map(
                    groupRows,
                    ({
                      product_id,
                      product_title,
                      product_quantity,
                      product_image,
                    }) => ({
                      id: product_id,
                      title: product_title,
                      quantity: product_quantity,
                      image: product_image,
                    })
                  ),
            created_at: groupRows[0].created_at,
            updated_at: groupRows[0].updated_at,
          }))
          .first();
        if (result === undefined) return [];
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get package by category
   * @param {String} slug
   * @returns
   */
  static async getByCategory(category) {
    if (!['general', 'custom'].includes(category))
      throw new Error('Kategori tidak valid');
    return knex('packages')
      .select(
        'packages.*',
        'packages_detail.id as product_id',
        'packages_detail.product as product_title',
        'packages_detail.quantity as product_quantity',
        'products.image as product_image'
      )
      .where('packages.category', '=', category)
      .leftJoin('packages_detail', 'packages.title', 'packages_detail.package')
      .leftJoin('products', 'products.title', 'packages_detail.product')
      .then((packages) => {
        const result = _(packages)
          .groupBy('title')
          .map((groupRows) => ({
            id: groupRows[0].id,
            title: groupRows[0].title,
            slug: groupRows[0].slug,
            summary: groupRows[0].summary,
            category: groupRows[0].category,
            description: groupRows[0].description,
            price: groupRows[0].price,
            image: groupRows[0].image,
            products:
              groupRows[0].product_id == null
                ? []
                : _.map(
                    groupRows,
                    ({
                      product_id,
                      product_title,
                      product_quantity,
                      product_image,
                    }) => ({
                      id: product_id,
                      title: product_title,
                      quantity: product_quantity,
                      image: product_image,
                    })
                  ),
            created_at: groupRows[0].created_at,
            updated_at: groupRows[0].updated_at,
          }));
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service generate packages to detail payment
   * @param {Object} packages
   * @returns
   */
  static async packagesToPayment(packages) {
    const allPackages = await this.get();
    let gross_amount = 0;
    let packagesValid = [];

    for (let i = 0; i < packages.length; i++) {
      allPackages
        .filter((pkg) => {
          if (pkg.id == packages[i].id) {
            packagesValid.push({
              id: pkg.id,
              quantity: packages[i].quantity,
              price: pkg.price,
            });
            gross_amount += pkg.price * packages[i].quantity;
          }
        })
        .value();
    }

    if (gross_amount == 0 || packagesValid.length == 0)
      throw 'Paket yang dimasukkan tidak valid';

    return {
      items: packagesValid,
      gross_amount,
    };
  }

  /**
   * Service store package
   * @param {Object} body
   * @returns
   */
  static async store(body) {
    PackageValidate.valid(body);

    const packageItems = Object.assign({ id: uuid() }, body);
    return await knex('packages')
      .insert(packageItems)
      .then(() => new Package(packageItems))
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY') {
          throw new Error('Paket ini sudah tersedia');
        }
        throw new Error(error);
      });
  }

  static async customPackage(payload) {
    const pkg = Object.assign({ category: 'custom' }, payload);
    PackageValidate.valid(pkg);

    const packageItems = Object.assign({ id: uuid() }, pkg);
    return await knex('packages')
      .insert(packageItems)
      .then(() => new Package(packageItems))
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY') {
          throw new Error('Paket ini sudah tersedia');
        }
        throw new Error(error);
      });
  }

  /**
   * Service update package by slug
   * @param {Stirng} slug
   * @param {Object} body
   * @returns
   */
  static async update(slug, body) {
    PackageValidate.valid(body);

    return await knex('packages')
      .where('slug', '=', slug)
      .update(body)
      .then((updated) => {
        if (updated === 0) {
          throw 'Id atau paket tersebut tidak dtemukan';
        }
        return new Package(body);
      })
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY') {
          throw new Error('Paket ini sudah tersedia');
        }
        throw new Error(error);
      });
  }

  /**
   * Service delete package by slug
   * @param {String} slug
   * @returns
   */
  static async delete(slug) {
    return await knex('packages')
      .where({ slug })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau paket tersebut tidak tersedia';
        return 'Paket berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  /**
   * Service store product on package
   * @param {String} slugPackage
   * @param {Object} body
   */
  static async storeProduct(slugPackage, body) {
    PackageValidate.validProduct(body);

    return await knex('packages')
      .select('title')
      .where('slug', slugPackage)
      .first()
      .then((row) => {
        if (row == undefined)
          throw 'Paket atau produk yang anda masukkan tidak tersedia';
        return row.title;
      })
      .then(async (title) => {
        return await knex('packages_detail')
          .select()
          .where('package', title)
          .andWhere('product', body.title)
          .then((row) => {
            if (row.length == 1) throw 'Produk sudah terdaftar dalam paket';
            return {
              id: uuid(),
              package: title,
              product: body.title,
              quantity: body.quantity,
            };
          })
          .catch((error) => {
            throw error;
          });
      })
      .then(async (product) => {
        return await knex('packages_detail')
          .insert(product)
          .then(() => product)
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        if (error.code == 'ER_NO_REFERENCED_ROW_2')
          throw new Error(
            'Paket atau produk yang anda masukkan tidak tersedia'
          );
        throw new Error(error);
      });
  }

  /**
   * Service update product on package
   * @param {String} slugPackage
   * @param {Object} body
   */
  static async updateProductQuantity(slugPackage, id, body) {
    PackageValidate.validProductUpdateQuantity(body);

    return await knex('packages')
      .select('title')
      .where('slug', slugPackage)
      .first()
      .then((row) => {
        if (row == undefined)
          throw 'Paket atau produk yang anda masukkan tidak tersedia';
        return row.title;
      })
      .then(async (pkg) => {
        const updateQuantity = { quantity: body.quantity };
        return await knex('packages_detail')
          .where('package', pkg)
          .andWhere('id', id)
          .update(updateQuantity)
          .then((updated) => {
            if (updated == 0)
              throw 'Paket atau produk yang anda masukkan tidak tersedia';
            return updateQuantity;
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service delete product on package
   * @param {String} slugPackage
   * @param {Object} body
   */
  static async deleteProduct({ slug, id }) {
    return await knex('packages')
      .select('title')
      .where('slug', slug)
      .first()
      .then((row) => {
        if (row == undefined)
          throw 'Paket atau produk yang anda masukkan tidak tersedia';
        return row;
      })
      .then(async (pkg) => {
        return await knex('packages_detail')
          .where('package', pkg.title)
          .andWhere('id', id)
          .del()
          .then((deleted) => {
            if (deleted === 0) throw 'Id atau paket tersebut tidak tersedia';
            return 'Produk berhasil dihapus dari paket';
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { PackageService };

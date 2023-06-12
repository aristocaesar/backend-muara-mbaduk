const { knex } = require('../../config/database');
const { Review } = require('./review.model');
const { ReviewValidate } = require('./review.validate');
const { v4: uuid } = require('uuid');

class ReviewService {
  /**
   * Service get all reviews
   * @returns Object
   */
  static async get() {
    return await knex('reviews')
      .select(
        'reviews.*',
        'packages.id as pkg',
        'packages.title as pkg_title',
        'users.fullname as fullname',
        'users.images as images'
      )
      .join('users', 'reviews.id_user', 'users.id')
      .join('packages', 'reviews.id_package', 'packages.id')
      .then((reviews) => {
        return reviews.map((review) => new Review(review).toJSON());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get all reviews
   * @returns Object
   */
  static async getById(id) {
    return await knex('reviews')
      .select(
        'reviews.*',
        'packages.id as pkg',
        'packages.title as pkg_title',
        'users.fullname as fullname',
        'users.images as images'
      )
      .join('users', 'reviews.id_user', 'users.id')
      .join('packages', 'reviews.id_package', 'packages.id')
      .where('reviews.id', id)
      .first()
      .then((review) => {
        if (review == undefined) return [];
        return new Review(review).toJSON();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get all reviews
   * @returns Object
   */
  static async getByPackage(id) {
    return await knex('reviews')
      .select(
        'reviews.*',
        'packages.id as pkg',
        'packages.title as pkg_title',
        'users.fullname as fullname',
        'users.images as images'
      )
      .join('users', 'reviews.id_user', 'users.id')
      .join('packages', 'reviews.id_package', 'packages.id')
      .where('reviews.id_package', id)
      .then((reviews) => {
        if (reviews == undefined) return [];
        return reviews.map((review) => new Review(review).toJSON());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get all reviews by payment
   * @returns Object
   */
  static async getByPayment(id) {
    return await knex('reviews')
      .select(
        'reviews.*',
        'packages.id as pkg',
        'packages.title as pkg_title',
        'users.fullname as fullname',
        'users.images as images'
      )
      .join('users', 'reviews.id_user', 'users.id')
      .join('packages', 'reviews.id_package', 'packages.id')
      .where('reviews.id_payment', id)
      .then((reviews) => {
        if (reviews == undefined) return [];
        return reviews.map((review) => new Review(review).toJSON());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service store reviews
   * @returns Object
   */
  static async store(body) {
    ReviewValidate.valid(body);

    const review = Array.isArray(body.id_package)
      ? body.id_package.map((pkg) => {
          return {
            id: uuid(),
            id_package: pkg,
            id_payment: body.id_payment,
            id_user: body.id_user,
            star: body.star,
            description: body.description,
          };
        })
      : Object.assign({ id: uuid() }, body);

    return await knex('reviews')
      .insert(review)
      .then(() => {
        return Array.isArray(review) == true
          ? review.map((data) => {
              return new Review(data).toJSON();
            })
          : new Review(review).toJSON();
      })
      .catch((error) => {
        if (error.code == 'ER_NO_REFERENCED_ROW_2')
          throw new Error(
            'Paket, Payment atau User untuk review tidak tersedia'
          );
        throw new Error(error);
      });
  }

  /**
   * Service update reviews by id
   * @returns Object
   */
  static async update(id, body) {
    ReviewValidate.update(body);

    return await knex('reviews')
      .where({ id_payment: id })
      .update(body)
      .then(() => new Review(body).toJSON())
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service delete reviews by id
   * @returns Object
   */
  static async delete(id) {
    return await knex('reviews')
      .where({ id_payment: id })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau review tersebut tidak tersedia';
        return 'Review berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { ReviewService };

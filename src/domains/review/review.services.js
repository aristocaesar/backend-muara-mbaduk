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
        'packages.slug as pkg',
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
        'packages.slug as pkg',
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
   * Service store reviews
   * @returns Object
   */
  static async store(body) {
    ReviewValidate.valid(body);

    const review = Object.assign({ id: uuid() }, body);
    return await knex('reviews')
      .insert(review)
      .then(() => new Review(review).toJSON())
      .catch((error) => {
        if (error.code == 'ER_NO_REFERENCED_ROW_2')
          throw new Error('Paket atau User review tidak tersedia');
        throw new Error(error);
      });
  }

  /**
   * Service update reviews by id
   * @returns Object
   */
  static async update(id, body) {
    ReviewValidate.valid(body);

    return await knex('reviews')
      .where({ id })
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
      .where({ id })
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
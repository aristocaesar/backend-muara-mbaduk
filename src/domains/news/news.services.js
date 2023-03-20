const { knex } = require('../../config/database');
const { v4: uuid } = require('uuid');
const { News } = require('./news.model');
const { NewsValidate } = require('./news.validate');

class NewsService {
  /**
   * Service get all news
   * @returns
   */
  static async get() {
    return await knex('news')
      .select()
      .then((rows) => {
        return rows.map((row) => new News(row));
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service get news where slug
   * @param {String} slug
   * @returns
   */
  static async getBySlug(slug) {
    return await knex('news')
      .select()
      .where('slug', slug)
      .first()
      .then((row) => new News(row).toJson())
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service store news
   * @param {Object} body
   * @returns
   */
  static async store(body) {
    NewsValidate.valid(body);

    const news = Object.assign({ id: uuid() }, body);
    return await knex('news')
      .insert(news)
      .then(() => new News(news).toJson())
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY')
          throw new Error('Berita ini sudah tersedia');
        throw new Error(error);
      });
  }

  /**
   * Service update news where slug
   * @param {String} slug
   * @param {Object} body
   * @returns
   */
  static async update(slug, body) {
    NewsValidate.valid(body);

    return await knex('news')
      .where('slug', slug)
      .update(body)
      .then((updated) => {
        if (updated == 0) throw 'Id atau berita yang masukkan tidak tersedia';
        return new News(body).toJson();
      })
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY')
          throw new Error('Berita ini sudah tersedia');
        throw new Error(error);
      });
  }

  /**
   * Service delete news where slug
   * @param {String} slug
   * @returns
   */
  static async delete(slug) {
    return await knex('news')
      .where('slug', slug)
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Berita tersebut tidak tersedia';
        return 'Berita berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { NewsService };

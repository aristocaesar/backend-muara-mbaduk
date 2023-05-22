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
   * Service get news where id
   * @param {String} id
   * @returns
   */
  static async getById(id) {
    return await knex('news')
      .select()
      .where('id', id)
      .orWhere('slug', id)
      .first()
      .then((row) => {
        if (row == undefined) return [];
        return new News(row).toJson();
      })
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
  static async update(id, body) {
    NewsValidate.valid(body);

    return await knex('news')
      .where('id', id)
      .orWhere('slug', id)
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
   * Service delete news where id
   * @param {String} id
   * @returns
   */
  static async delete(id) {
    return await knex('news')
      .where('id', id)
      .orWhere('slug', id)
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

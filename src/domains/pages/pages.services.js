const { knex } = require('../../config/database');
const { v4: uuid } = require('uuid');
const { Pages } = require('./pages.model');
const { PagesValidate } = require('./pages.validate');

class PageService {
  /**
   * Get Pages
   * @returns
   */
  static async get() {
    return await knex
      .select()
      .table('pages')
      .then((rows) => {
        return rows.map((faq) => new Pages(faq).toJson());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Get page by id or slug
   * @param {String} id
   * @returns
   */
  static async getByIdOrSlug(payload) {
    return await knex
      .select()
      .where({ id: payload })
      .orWhere({ slug: payload })
      .table('pages')
      .first()
      .then((row) => {
        if (row == undefined) return [];
        return new Pages(row).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Get page by slug
   * @param {String} slug
   * @returns
   */
  static async getBySlug(slug) {
    return await knex
      .select()
      .where({ slug })
      .table('pages')
      .first()
      .then((row) => new Pages(row).toJson())
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service store page
   * @param {Object} payload
   * @returns
   */
  static async store(payload) {
    PagesValidate.valid(payload);

    const page = Object.assign({ id: uuid() }, payload);
    return await knex
      .insert(page)
      .table('pages')
      .then(() => {
        return new Pages(page).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service update page
   * @param {String} id
   * @param {Object} payload
   * @returns
   */
  static async update(id, payload) {
    PagesValidate.validUpdate(payload);

    return await knex
      .update(payload)
      .where({ id })
      .table('pages')
      .then((updated) => {
        if (updated == 0) throw 'Id atau halaman tersebut tidak tersedia';
        return new Pages(payload).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service delete page
   * @param {String} id
   * @returns
   */
  static async delete(id) {
    return await knex('pages')
      .where({ id })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau halaman tersebut tidak tersedia';
        return 'Halaman berhasil dihapus';
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { PageService };

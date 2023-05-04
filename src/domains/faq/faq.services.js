const { knex } = require('../../config/database');
const { v4: uuid } = require('uuid');
const { Faq } = require('./faq.model');
const { FaqValidate } = require('./faq.validate');

class FaqService {
  /**
   * Get Faqs
   * @returns
   */
  static async get() {
    return await knex
      .select()
      .table('faq')
      .then((rows) => {
        return rows.map((faq) => new Faq(faq).toJson());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Get faq by id
   * @param {String} id
   * @returns
   */
  static async getById(id) {
    return await knex
      .select()
      .where({ id })
      .table('faq')
      .first()
      .then((row) => {
        if (row == undefined) return [];
        return new Faq(row).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service store faq
   * @param {Object} payload
   * @returns
   */
  static async store(payload) {
    FaqValidate.valid(payload);

    const faq = Object.assign({ id: uuid() }, payload);
    return await knex
      .insert(faq)
      .table('faq')
      .then(() => {
        return new Faq(faq).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service update faq
   * @param {String} id
   * @param {Object} payload
   * @returns
   */
  static async update(id, payload) {
    FaqValidate.valid(payload);

    return await knex
      .update(payload)
      .where({ id })
      .table('faq')
      .then(() => {
        return new Faq(Object.assign({ id }, payload)).toJson();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service delete faq
   * @param {String} id
   * @returns
   */
  static async delete(id) {
    return await knex('faq')
      .where({ id })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau faq tersebut tidak tersedia';
        return 'Faq berhasil dihapus';
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = { FaqService };

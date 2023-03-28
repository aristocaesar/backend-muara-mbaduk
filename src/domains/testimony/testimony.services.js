const { knex } = require('../../config/database');
const { Testimony } = require('./testimony.model');
const { TestimonyValidate } = require('./testimony.validate');
const { v4: uuid } = require('uuid');

class TestimonyService {
  /**
   * Service get all testimonies
   * @returns Object
   */
  static async get() {
    return await knex('testimonials')
      .select()
      .then((testimonies) => {
        return testimonies.map((testimony) =>
          new Testimony(testimony).toJSON()
        );
      });
  }

  /**
   * Service get all testimonies
   * @returns Object
   */
  static async getById(id) {
    return await knex('testimonials')
      .select()
      .where('id', id)
      .first()
      .then((testimony) => {
        if (testimony == undefined) return [];
        return new Testimony(testimony).toJSON();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * Service store testimonies
   * @returns Object
   */
  static async store(body) {
    TestimonyValidate.valid(body);

    const testimony = Object.assign({ id: uuid() }, body);
    return await knex('testimonials')
      .insert(testimony)
      .then(() => new Testimony(testimony).toJSON())
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY') {
          throw new Error('Testimoni ini sudah tersedia');
        }
        throw new Error(error);
      });
  }

  /**
   * Service update testimonies by id
   * @returns Object
   */
  static async update(id, body) {
    TestimonyValidate.valid(body);

    return await knex('testimonials')
      .where({ id })
      .update(body)
      .then(() => new Testimony(body).toJSON())
      .catch((error) => {
        if (error.code == 'ER_DUP_ENTRY') {
          throw new Error('Testimoni ini sudah tersedia');
        }
        throw new Error(error);
      });
  }

  /**
   * Service delete testimonies by id
   * @returns Object
   */
  static async delete(id) {
    return await knex('testimonials')
      .where({ id })
      .del()
      .then((deleted) => {
        if (deleted === 0) throw 'Id atau testimoni tersebut tidak tersedia';
        return 'Testimoni berhasil dihapus';
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = { TestimonyService };

const knex = require('../../config/database');
const { Testimony } = require('./testimony.model');

class TestimonyService {
  static async getAll() {
    const testimonies = await knex.select().table('testimony');
    console.log(testimonies);
    return testimonies.map((testimony) => new Testimony(testimony));
  }

  static async getById(id) {}

  static async create(userData) {}

  static async updateById(id, userData) {}

  static async deleteById(id) {}
}

module.exports = { TestimonyService };

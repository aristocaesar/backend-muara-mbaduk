const knex = require('../../config/database');
const { Testimony } = require('./testimony.model');

class TestimonyService {
  static async getAll() {
    return new Testimony(
      1,
      'Aristo Caesar',
      'aristo.png',
      'Qui consequat nulla laboris qui tempor sint occaecat velit amet officia.',
      'dsad',
      1,
      's'
    ).toJSON();
  }

  static async getById(id) {}

  static async create(userData) {}

  static async updateById(id, userData) {}

  static async deleteById(id) {}
}

module.exports = { TestimonyService };

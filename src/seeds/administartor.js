const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('administrator').del();
  // Default password = 121212
  const password = bcrypt.hashSync('121212', 8);
  await knex('administrator').insert([
    {
      id: uuid(),
      fullname: 'Aristo Caesar Pratam',
      email: 'aristo.belakang@gmai.com',
      password: password,
      access: 'active',
    },
  ]);
};

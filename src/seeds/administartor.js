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
  const password_master = bcrypt.hashSync('12345', 8);
  const password_default = bcrypt.hashSync('12345', 8);
  await knex('administrator').insert([
    {
      id: uuid(),
      fullname: 'Aristo Caesar Pratama',
      email: 'hi@aristocaesar.my.id',
      role: 'master',
      password: password_master,
      access: 'active',
    },
    {
      id: uuid(),
      fullname: 'Dewa Ayu Lestari',
      email: 'dewaayu@gmail.com',
      role: 'default',
      password: password_default,
      access: 'active',
    },
  ]);
};

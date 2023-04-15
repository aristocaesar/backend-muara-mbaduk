const { v4: uuid } = require('uuid');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tickets').del();
  await knex('tickets').insert([
    {
      id: uuid(),
      title: 'Tanpa Berkemah',
      category: 'tourist',
      normal_day: 5000,
      weekend_day: 10000,
    },
    {
      id: uuid(),
      title: 'Berkemah',
      category: 'tourist',
      normal_day: 10000,
      weekend_day: 10000,
    },
    {
      id: uuid(),
      title: 'Kendaraan roda 2',
      category: 'transport',
      normal_day: 5000,
      weekend_day: 5000,
    },
    {
      id: uuid(),
      title: 'Kendaraan roda 4',
      category: 'transport',
      normal_day: 15000,
      weekend_day: 15000,
    },
  ]);
};

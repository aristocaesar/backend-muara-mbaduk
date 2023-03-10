/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('ticket', function (table) {
    table.bigint('tourist_normal_day').notNullable();
    table.bigint('tourist_weekend_day').notNullable();
    table.bigint('transport_2').notNullable();
    table.bigint('transport_4').notNullable();
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ticket');
};

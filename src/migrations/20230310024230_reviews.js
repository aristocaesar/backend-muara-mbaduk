/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('reviews', function (table) {
    table.uuid('id').primary();
    table
      .string('id_package')
      .references('id')
      .inTable('packages')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .string('id_payment')
      .references('id')
      .inTable('payments')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .string('id_user')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.enu('star', [1, 2, 3, 4, 5]).defaultTo(5);
    table.text('description').notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
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
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('reviews');
};

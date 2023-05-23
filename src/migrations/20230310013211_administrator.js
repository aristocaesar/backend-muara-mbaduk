/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('administrator', function (table) {
    table.uuid('id').primary();
    table.string('fullname').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.enu('role', ['master', 'default']).defaultTo('default');
    table.enu('access', ['active', 'suspend']).defaultTo('active');
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
  await knex.schema.dropTableIfExists('administrator');
};

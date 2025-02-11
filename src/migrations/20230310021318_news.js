/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('news', function (table) {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.string('slug').notNullable().unique();
    table.text('body').notNullable();
    table.string('thumbnail').notNullable();
    table
      .string('author')
      .references('id')
      .inTable('administrator')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
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
  await knex.schema.dropTableIfExists('news');
};

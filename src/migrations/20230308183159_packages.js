/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('packages', function (table) {
    table.uuid('id').primary();
    table.string('title').notNullable().unique();
    table.string('slug').notNullable().unique();
    table.string('summary').notNullable();
    table
      .enu('category', ['general', 'custom'])
      .defaultTo('general')
      .notNullable();
    table.text('description').notNullable();
    table.bigint('price').notNullable();
    table.string('image').notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
  await knex.schema.createTable('packages_detail', function (table) {
    table.uuid('id').primary();
    table
      .string('package')
      .notNullable()
      .references('title')
      .inTable('packages')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .string('product')
      .notNullable()
      .references('title')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('quantity').notNullable().defaultTo(1);
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
  await knex.schema.dropTableIfExists('packages_detail');
  await knex.schema.dropTableIfExists('packages');
};

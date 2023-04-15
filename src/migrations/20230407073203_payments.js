/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('payments', function (table) {
    table.uuid('id').primary();
    table.string('order_id').notNullable();
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('package_id')
      .references('id')
      .inTable('packages')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.enu('type', ['cash', 'bank']).defaultTo('bank');
    table.string('visit').notNullable();
    table.enu('day', ['normal', 'weekend']);
    table.bigint('gross_amount').notNullable();
    table
      .enum('status', ['pending', 'settlement', 'expire', 'deny', 'cancel'])
      .defaultTo('pending');
    table.string('expire_at').notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

  await knex.schema.createTable('payment_detail', function (table) {
    table.uuid('id').primary();
    table
      .uuid('payment_id')
      .references('id')
      .inTable('payments')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('merchant').notNullable();
    table.string('name_bank').notNullable();
    table.string('va_bank').notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

  await knex.schema.createTable('ticket_detail', function (table) {
    table.uuid('id').primary();
    table
      .uuid('payment_id')
      .references('id')
      .inTable('payments')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('ticket_id')
      .references('id')
      .inTable('tickets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('name');
    table.string('identity');
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
  await knex.schema.dropTableIfExists('ticket_detail');
  await knex.schema.dropTableIfExists('payment_detail');
  await knex.schema.dropTableIfExists('payments');
};

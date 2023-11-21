import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('secure_data', (table) => {
    table.string('id').primary();
    table.text('value');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('secure_data');
}

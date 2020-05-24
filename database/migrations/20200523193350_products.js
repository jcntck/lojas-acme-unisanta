
exports.up = function(knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments();

    table.string('name').notNullable();
    table.string('description').notNullable();
    table.float('price').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};

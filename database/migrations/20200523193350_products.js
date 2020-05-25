exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.increments();

    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("image");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};

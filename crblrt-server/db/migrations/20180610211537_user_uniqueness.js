exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTable("users")
    .createTable("users", function(table) {
      table.increments("id");
      table.string("email");
      table.string("username");
      table.string("password_digest");
      table.string("phone_number");
      table.specificType("geo_tag", "POINT");
      table.integer("points");
      table.boolean("notifications");
      table.timestamp("signup_at").defaultTo(knex.fn.now());
      table.unique("email");
      table.unique("username");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTable("users")
    .createTable("users", function(table) {
      table.increments("id");
      table.string("email");
      table.string("username");
      table.string("password_digest");
      table.string("phone_number");
      table.specificType("geo_tag", "POINT");
      table.integer("points");
      table.boolean("notifications");
      table.timestamp("signup_at").defaultTo(knex.fn.now());
    })
  ]);
};

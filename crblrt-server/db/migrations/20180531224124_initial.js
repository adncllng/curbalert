exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(table){
      table.increments('id');
      table.string('email');
      table.string('username');
      table.string('password_digest');
      table.string('city');
      table.string('prov');
      table.string('country');
      table.string('phone_number');
      table.integer('points');
      table.boolean('notifications');
      table.timestamp('signup_at').defaultTo(knex.fn.now());

    }),
    knex.schema.createTable('post', function(table){
      table.increments('id');
      table.integer('user_id').references('user');
      table.string('title');
      table.string('content');
      table.string('image_url');
      table.string('geo_tag');
      table.integer('point_value');
      table.boolean('visible');
      table.timestamp('created_at').defaultTo(knex.fn.now());

    }),
    knex.schema.createTable('tag', function(table){
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('post_tag', function(table){
      table.integer('post_id').references('post');
      table.integer('tag_id').references('tag');
    }),
    knex.schema.createTable('user_tag', function(table){
        table.integer('user_id').references('user');
        table.integer('tag_id').references('tag');
      })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('post'),
    knex.schema.dropTable('tag'),
    knex.schema.dropTable('post_tag'),
    knex.schema.dropTable('user_tag')
  ])
};

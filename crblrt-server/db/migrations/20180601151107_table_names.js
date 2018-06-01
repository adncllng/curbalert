exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
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
    knex.schema.createTable('posts', function(table){
      table.increments('id');
      table.integer('user_id').references('users');
      table.string('title');
      table.string('content');
      table.string('image_url');
      table.string('geo_tag');
      table.integer('point_value');
      table.boolean('visible');
      table.timestamp('created_at').defaultTo(knex.fn.now());

    }),
    knex.schema.createTable('tags', function(table){
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('posts_tags', function(table){
      table.integer('post_id').references('posts');
      table.integer('tag_id').references('tags');
    }),
    knex.schema.createTable('users_tags', function(table){
        table.integer('user_id').references('users');
        table.integer('tag_id').references('tags');
      })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('posts_tags'),
    knex.schema.dropTable('users_tags')
  ])
};

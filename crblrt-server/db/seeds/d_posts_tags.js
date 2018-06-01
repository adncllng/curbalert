const faker = require("faker");
const dataLength = 5;

exports.seed = function(knex, Promise) {
  return knex('posts_tags').truncate()
    .then(function () {
      const posts_tags = [];
      for (let index = 0; index < dataLength; index++) {
        posts_tags.push({
          post_id: faker.random.number({min:1, max:5}),
          tag_id: faker.random.number({min:1, max:5})
        });
      }
      return knex('posts_tags').insert(posts_tags);
    })
};
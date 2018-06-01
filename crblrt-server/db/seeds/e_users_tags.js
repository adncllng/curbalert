const faker = require("faker");
const dataLength = 5;

exports.seed = function(knex, Promise) {
  return knex('users_tags').truncate()
    .then(function () {
      const users_tags = [];
      for (let index = 0; index < dataLength; index++) {
        users_tags.push({
          user_id: faker.random.number({min:1, max:5}),
          tag_id: faker.random.number({min:1, max:5})
        });
      }
      return knex('users_tags').insert(users_tags);
    })
};
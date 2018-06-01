const faker = require("faker");
const dataLength = 5;

exports.seed = function(knex, Promise) {
  return knex('tags').truncate()
    .then(function () {
      const tags = [];
      for (let index = 0; index < dataLength; index++) {
        tags.push({
          name: faker.lorem.words(1)
        });
      }
      return knex('tags').insert(tags);
    })
};
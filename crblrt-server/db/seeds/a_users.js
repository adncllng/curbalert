const faker = require("faker");
const dataLength = 5;

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function() {
      const users = [];
      for (let index = 0; index < dataLength; index++) {
        users.push({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password_digest: faker.internet.password(),
          geo_tag: knex.raw(`point(45.4768, -73.5842)`),
          phone_number: faker.phone.phoneNumber(),
          points: faker.random.number({min:5, max:10}),
          notifications: faker.random.boolean()
        });
      }
      return knex('users').insert(users);
    })
};

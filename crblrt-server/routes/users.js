const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bcrypt = require('bcryptjs');
require('dotenv').config();


// Get users listing JSON
module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.send(results)
      });
  });

  //Register route
  router.post("/users/new", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const city = req.body.city;
    const prov = req.body.prov;
    const country = req.body.country;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, { expiresIn: 129600 }); // Signing the token

    knex.transaction(() => {
      return knex('users').select('id').where('token', token).returning('id')
      .then((users) => {
        if (!users.length) {
          return knex('users').insert({
            token
          }).returning('id');
        }

        let id = users[0].id;

        return knex('users').where('id', id).returning('email')
          .update({
            email,
            username,
            password_digest: hashedPassword,
            city,
            prov,
            country
          })
          .then((email) => {
            res.status(200).send(email);
          })
          .catch((error) => {
            res.status(500).send(error);
          })
      })
    })
  });

  // Login route
  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    knex.transaction(() => {
      return knex('users').select('id').where('email', email)
      .then((users) => {
        if (!users.length) {
          return Promise.reject(new Error('User not found'));
        }
        return knex('users').where('id', users[0].id)
          .then((user) => {
            const password_digest = user[0].password_digest;
            if(!bycrpt.compareSync(password, password_digest)) {
              return Promise.reject(new Error('Incorrect password'));
            }
            return knex('users').where('id', user[0].id)
              .update({
                token
              })
              .then(() => {
                //If all credentials are correct do this
                let token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, { expiresIn: 129600 }); // Signing the token
                res.status(200).json({
                  status: 'success',
                  token: token
                });
              })
              .catch((error) => {
                res.status(500).send('Email or password is incorrect');
              });
          })
        })
     })
  });

  return router;
}
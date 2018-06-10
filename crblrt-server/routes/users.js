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
  router.post("/register", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const geo_tag = req.body.geo_tag;
    const points = req.body.points;
    const hashedPassword = bcrypt.hashSync(password, 10);

    knex.transaction(() => {
      return knex('users').insert({
        email,
        username,
        password_digest: hashedPassword,
        geo_tag,
        points:100
      })
      .returning('id')
      .then((id) => {
        const token = jwt.sign({ id: id[0] }, process.env.SECRET_TOKEN, { expiresIn: 129600 }); // Signing the token
        res.json({ token: token });
      })
      .catch((error) => {
        res.status(500).send('Email or username taken');
      });
    })
  });

  // Login route
  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    knex.transaction(() => {
      return knex('users')
      .where('email', email)
      .then((users) => {

        var passwordIsValid = bcrypt.compareSync(password, users[0].password_digest);

        if (!passwordIsValid) return res.status(401).send({ token: null });
          const token = jwt.sign({ id: users[0].id }, process.env.SECRET_TOKEN, { expiresIn: 129600 });
          res.status(200).send({ token: token });
        })

        .catch((error) => {
          res.status(500).send('Email or password is incorrect');
        });

        })

     })

     router.get("/:user_id", (req, res) => {
       knex
         .select("*")
         .from("users")
         .where("id", req.params.user_id)
         .then((results) => {
           res.send(results)
         });
     });
  return router;
}







  // return knex('users').where('id', users[0].id)
  //         .then((user) => {
  //           const password_digest = user[0].password_digest;
  //           if(!bcrypt.compareSync(password, password_digest)) {
  //             return Promise.reject(new Error('Incorrect password'));
  //           }
  //           return knex('users').where('id', user[0].id)
  //             .update({
  //               token
  //             })
  //             .then(() => {
  //               //If all credentials are correct do this
  //               let token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, { expiresIn: 129600 }); // Signing the token
  //               res.status(200).json({
  //                 status: 'success',
  //                 token: token
  //               });

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bcrypt = require('bcryptjs');


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

  // Login route
  router.post("/login", (req, res) => {
    knex
      .select(req.body.email)
      .from("users")
      .then((user) => {
        if (user) {
        if (password == user.password) {
          //If all credentials are correct do this
          let token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, { expiresIn: 129600 }); // Signing the token
          res.status(200).json({
            status: 'success',
            token: token
          });
        } else {
          res.status(401).json({
            err: 'Email or password is incorrect'
          });
        }
      };
  });

  return router;
}
var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.send(results)
      });
  });
  return router;
}

var express = require('express');
var router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .then((results) => {
        res.json(results)
      });
  });
  return router;
}

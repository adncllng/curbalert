var express = require('express');
var router = express.Router();

module.exports = (knex) => {

  router.get("/api/posts", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .then((results) => {
        res.json(results)
      });
  });
  return router;
}

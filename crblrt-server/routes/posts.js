var express = require('express');
var router = express.Router();

/* GET posts listing. */
module.exports = (knex) => {

  router.get("/posts", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .then((results) => {
        res.send(results)
      });
  });
  return router;
}

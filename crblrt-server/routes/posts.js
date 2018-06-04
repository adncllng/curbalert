var express = require('express');
var router = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log(req)
    knex
      .select("*")
      .from("posts")
      .then((results) => {
        res.json(results)
      });
  });
  return router;
}

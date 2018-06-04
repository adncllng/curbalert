var express = require('express');
var router = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {

  const {user_id,title,content,image_url,geo_tag,point_value,visible,tags} = req.body;
  let postId = null;
  knex('posts')
      .returning('id')
      .insert({user_id,title,content,image_url,geo_tag,point_value,visible})
      .then((post_id)=>{
        postId = post_id;
              knex('tags')
                .returning('id')
                .insert(
                  tags.map(tag => {
                    return {name: tag};
                  })
                )
                .then((tag_ids)=>{
                  knex('posts_tags')
                  .insert(
                    tag_ids.map(tagId =>{
                      return {post_id: Number(postId), tag_id: Number(tagId)};
                    })
                  ).then(res.send("fucking hell"))
                })
    })
  });


  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("posts_tags")
      .then((results) => {
        res.json(results)
      });
  });
  return router;
}

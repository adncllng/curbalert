const express = require('express');

const router = express.Router();

module.exports = (knex) => {
  router.post('/', (req, res) => {

    const {
      user_id, title, content, image_url, geo_tag, point_value, visible, tags,
    } = req.body;
    let postId = null;

    console.log(req.body)
    knex('posts')
      .returning('id')
      .insert({
        user_id,
        title,
        content,
        image_url,
        geo_tag: `${geo_tag.x}, ${geo_tag.y}`,
        point_value,
        visible,
      })
      .then((post_id) => {
        postId = post_id;
        knex('tags')
          .returning('id')
          .insert(tags.map(tag => ({ name: tag })))
          .then((tag_ids) => {
            knex('posts_tags')
              .insert(tag_ids.map(tagId => ({ post_id: Number(postId), tag_id: Number(tagId) })))
              .then(res.send('hi'));
          });
      }).catch((err)=>{
        return res.status(400).send(JSON.stringify(err))
      })
  });
  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('posts')
      .then((results) => {
        res.json(results);
      });
  });
  return router;
};

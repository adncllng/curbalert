const express = require('express');

const router = express.Router();

module.exports = (knex) => {
  router.post('/', (req, res) => {
    console.log()

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
        geo_tag,
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
      // .leftJoin('posts_tags','posts.id','posts_tags.post_id')
      // .leftJoin('tags','posts_tags.tag_id','tags.id')
      .then((posts) => {
        // [{post}]
        let postIds = posts.map(result => result.id)

        knex
        .select('posts_tags.post_id', 'tags.name')
        .from('posts_tags')
        .join('tags', 'tags.id','posts_tags.tag_id')
        .whereIn('posts_tags.post_id',postIds)
        .whereNotNull('tags.name')
        .then(postIdsAndTagNames =>{
        res.json(posts.map(post => {
          console.log(post)
            let tagsArray =[]
             postIdsAndTagNames.forEach( postIdAndTagName => {
             if (post.id == postIdAndTagName.post_id ){
                tagsArray.push(postIdAndTagName.name)}
            })
            return {...post, tags: tagsArray}
          })
        )


        })
      });
  });
  return router;
};

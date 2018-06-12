const express = require('express');

const router = express.Router();

module.exports = (knex) => {
  router.post('/:post_id/:user_id', (req, res) => {
    // if current user points >= 1 do all this else send sorry
    //  console.log(req.parmas.user_id)
    const decrementBy = req.body.claim ? 1 : 0;
    console.log(req.body.claim, req.body.claimed_by);
    knex('users')
      .where('id', Number(req.params.user_id))
      .andWhere('points', '>', 0)
      .decrement('points', decrementBy)
      .returning('*')
      .then((user) => {
        console.log('points', user[0]);
        if (user[0] || !req.body.claim) {
          knex('posts')
            .where('id', Number(req.params.post_id))
            .update({
              claimed_by: req.body.claimed_by,
              visible: !req.body.claim,
            })
            .then(() => {
              res.send(user[0]);
            });
        } else {
          res.status(400).send('not enough points');
        }
      })
      .catch((err) => {
        res.status(400).send('not enough points');
        // take away a point from :user_id
      });
  });

  router.delete('/:id', (req, res) => {
    knex('posts')
      .where('id', Number(req.params.id))
      .del()
      .then((result) => {
        res.send(`Post #${req.params.id} was deleted`);
      });
  });

  router.post('/', (req, res) => {
    console.log(req.body)
    const {
      user_id, title, content, image_url, geo_tag, point_value, visible, tags,
    } = req.body;
    let postId = null;
    knex('posts')
      .returning('id')
      .insert({
        user_id,
        title: title.substring(0, 10),
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
              .then(knex
                .select('*')
                .from('posts')
                .where('id', Number(postId))
                .then((result) => {
                  knex('users')
                    .where('id', Number(user_id))
                    .increment('points')
                    .then(() => {
                      res.send(result);
                    });
                }));
          });
      })
      .catch(err => res.status(400).send(JSON.stringify(err)));
  });

  router.get('/', (req, res) => {
    knex
      .select(
        'posts.id',
        'user_id',
        'title',
        'image_url',
        'content',
        'posts.geo_tag',
        'point_value',
        'visible',
        'created_at',
        'username',
        'claimed_by'
      )
      .from('posts')
      .leftOuterJoin('users', 'users.id', 'posts.user_id')
      .then((posts) => {
        const postIds = posts.map(result => result.id);
        knex
          .select('posts_tags.post_id', 'tags.name')
          .from('posts_tags')
          .join('tags', 'tags.id', 'posts_tags.tag_id')
          .whereIn('posts_tags.post_id', postIds)
          .whereNotNull('tags.name')
          .then((postIdsAndTagNames) => {
            res.json(posts.map((post) => {
              const tagsArray = [];
              postIdsAndTagNames.forEach((postIdAndTagName) => {
                if (post.id == postIdAndTagName.post_id) {
                  tagsArray.push(postIdAndTagName.name);
                }
              });
              return { ...post, tags: tagsArray };
            }));
          });
      });
  });
  return router;
};

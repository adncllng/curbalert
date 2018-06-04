import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';


class PostList extends Component {
 componentDidMount() {
   this.props.createPostList();
 }
	render() {
    let posts = null;
    if (this.props.posts.length) {
      posts = this.props.posts.map(post => {
        return (<div>
          {post.title}
          <img src={post.image_url} />
          {post.content}
          {post.geo_tag.x}
          {post.geo_tag.y}
          </div>)
      })
    }
		return (
      <div>{posts}</div>
    )
	}
}

export default PostList;

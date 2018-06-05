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
        return (<div className="card">
          <div className="card-image">
            <figure className="image">
              <img src={post.image_url} style={{ maxWidth: 100000000, maxHeight: 100000000 }}/>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{post.title}</p>
              </div>
            </div>
            <div className="content">
              {post.content}
              {post.geo_tag.x}
              {post.geo_tag.y}
              <br></br>
              <time dateTime="">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
            <a href="#" class="card-footer-item">Posts</a>
          </footer>
        </div>)
      })
    }
		return (
    <div className="container">
      <div className="section">
        <div className="row columns">
          <div className="column is-one-third">
            <div>{posts}</div>
          </div>
        </div>
      </div>
    </div>
    )
	}
}

export default PostList;

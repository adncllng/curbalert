import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import moment from 'moment';
import './styles/scss/NavBar.css';

class PostList extends Component {
 componentDidMount() {
   this.props.createPostList();
 }

	render() {
    let posts = null;
    if (this.props.posts.length) {
      posts = this.props.posts.map(post => {
        return (
          <div className="column is-one-third">
            <div className="card">
              <div className="card-image">
              <figure className="image">
                <img src={post.image_url} style={{ maxWidth: '100%' }}/>
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
                <br/>
                <br/>
                <small>({post.geo_tag.x}, {post.geo_tag.y})</small>
                <br/>
                <small>Posted {moment(post.created_at).fromNow()}</small>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">Claim Item</a>
              <a href="#" className="card-footer-item">View Map</a>
            </footer>
          </div>
        </div>
        )
      })
    }
		return (
    <div className="container">
      <div className="section">
        <div className="columns is-multiline is-mobile">
          {posts}
        </div>
      </div>
    </div>
    )
	}
}

export default PostList;

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/mystyles.scss';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer.jsx'

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
            <figure className="image is-4by3">
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
        </div>)
      })
    }
		return (
      <div>{posts}</div>
    )
	}
}

export default PostList;

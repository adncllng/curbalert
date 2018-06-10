import React, { Component } from 'react';
import moment from "moment";
import './styles/scss/userPost.css';


class UserPost extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteClick = () => {
    this.props.deletePost(this.props.id)
  }

  render() {
    return (
      <div className="column is-one-quarter is-mobile">
        <div className="card" ref="card">
          <div className="card-image">
            <figure className="image">
              <img src={this.props.image} style={{ maxWidth: "100%" }} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.title}</p>
              </div>
            </div>
              <div className="content">
                {this.props.content}
                <br />
                <br />
                <i className="fas fa-map-pin" /> {this.props.address}
                <br />
                <br />
                <small>(Posted {moment(this.props.created_at).fromNow()})</small>
              </div>
            </div>
            <footer className="card-footer">
              <a onClick={this.handleDeleteClick} className="card-footer-item">
                Delete
              </a>
            </footer>
        </div>
      </div>
    );
  }
}

export default UserPost
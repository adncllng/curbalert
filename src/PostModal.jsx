import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
    };
  }

  handleClick() {
    this.props.closeModal()
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.state.posts[0].title}</p>
            <img src={this.state.posts[0].image_url} style={{ maxWidth: '300px' }}/>
          </header>
          <section className="modal-card-body">
            <div className="content">
              {this.state.posts[0].content}
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button" onClick={this.handleClick.bind(this)}>Cancel</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default PostModal;
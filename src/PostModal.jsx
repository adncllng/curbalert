import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts
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
            <p className="modal-card-title">{this.props.modalParams.title}</p>
            <button className="delete" onClick={this.handleClick.bind(this)} />
          </header>
          <section className="modal-card-body">
            <img src={this.props.modalParams.image_url} style={{ maxWidth: '200px' }}/>
            <div className="content">
              {this.props.modalParams.content}
            </div>
          </section>
          <footer className="modal-card-foot">
            <small>Posted ___ days ago by ____ </small>
          </footer>
        </div>
      </div>
    );
  }
}

export default PostModal
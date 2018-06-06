import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';

class PostModal extends Component {

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Title</p>
          </header>
          <section className="modal-card-body">
            <div className="content">
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button">Cancel</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default PostModal;
import React, { Component } from 'react';
import moment from 'moment';
import Geocode from "react-geocode";
import './styles/scss/App.css';
import './styles/scss/PostModal.css';


class PostModal extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.closeModal()
  }

  render() {
    let lat = this.props.modalParams.geo_tag.x;
    let lng = this.props.modalParams.geo_tag.y;

    return (
      <div className="modal is-active">
        <div className="modal-content-width">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.modalParams.title}</p>
            <button className="delete" onClick={this.handleClick} />
          </header>
          <section className="modal-card-body">
            <img src={this.props.modalParams.image_url} className="modal-image" />
            <div className="content">
              {this.props.modalParams.content}
            </div>
            <div className="modal-address">
              <small>
                {this.props.modalParams.address}
                <i className="fas fa-map-pin"></i> {this.props.modalParams.address}
              </small>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-warning">Claim Item</button>
            <small>(Posted {moment(this.props.modalParams.created_at).fromNow()})</small>
          </footer>

        </div>
      </div>
    );
  }
}

export default PostModal

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import moment from 'moment';
import Geocode from "react-geocode";
import './styles/scss/App.css';

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      address:''
    };
  }

  handleClick = () => {
    this.props.closeModal()
    this.setState({ address: '' })
  }

  getAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address.slice(0, -30);
        this.setState({ address: address });
      }
    );
  }

  render() {
    let lat = this.props.modalParams.geo_tag.x;
    let lng = this.props.modalParams.geo_tag.y;

    return (
      <div className="modal is-active">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.modalParams.title}</p>
            <button className="delete" onClick={this.handleClick} />
          </header>
          <section className="modal-card-body">
            <img src={this.props.modalParams.image_url} style={{ maxWidth: '200px' }} alt={'Post image'}/>
            <div className="content">
              {this.props.modalParams.content}
            </div>
            <small>
              {this.getAddress(lat, lng)}
              <i className="fas fa-map-pin"></i> {this.state.address}
            </small>
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
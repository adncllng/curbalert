import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer.jsx'

class Home extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <MapContainer state={this.state} google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(Home);

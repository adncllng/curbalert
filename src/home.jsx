import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer.jsx'

class Home extends Component {
  componentDidMount() {
    axios.get('http://localhost:3001/')
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAAEye939ft3vqu11_JHAt3JgcuwfigHw0',
})(Home);

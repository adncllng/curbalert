import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer.jsx'

class Post extends Component {
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
			<div className="message">
				<span style={{ color: colour }} className="message-username">
					{this.props.username}
				</span>
				<span className="message-content">{this.props.content}</span>
			</div>
		);
	}
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';

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

		);
	}
}

export default Post;
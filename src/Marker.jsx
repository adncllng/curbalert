import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';
import PostModal from "./PostModal.jsx";


class Marker extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.toggleModal(this.props.$dimensionKey)
  }

  render() {
    return (
    <div
      onClick={this.handleClick.bind(this)}
      style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(-50%, -50%)'
    }}>
      { this.props.text }
    </div>
    );
  }
}

export default Marker;
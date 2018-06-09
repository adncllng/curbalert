import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles/scss/App.css';

class Marker extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.toggleModal(this.props.$dimensionKey)
  }

  render() {
    return (
      <img
        src={'http://res.cloudinary.com/ninayujiri/image/upload/v1528293527/pin-red.svg'}
        onClick={this.handleClick}
        style={{
          width: '30px',
        }}
      />
    );
  }
}

export default Marker
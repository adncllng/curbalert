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
    let img_url;
    if (this.props.markerParams.id == this.props.$dimensionKey) {
      img_url = 'http://res.cloudinary.com/ninayujiri/image/upload/v1528565134/pin-yellow.svg'
    } else {
      img_url = 'http://res.cloudinary.com/ninayujiri/image/upload/v1528293527/pin-red.svg'
    }

    return (
      <img
        src={img_url}
        onClick={this.handleClick}
        style={{
          width: '30px'
        }}
      />
    );
  }
}

export default Marker
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
      img_url = 'http://res.cloudinary.com/ninayujiri/image/upload/v1528762215/pin2.svg'
    } else {
      img_url = 'http://res.cloudinary.com/ninayujiri/image/upload/v1528762321/pin1.svg'
    }

    return (
      <img
        src={img_url}
        onClick={this.handleClick}
        style={{
          width: '32px'
        }}
      />
    );
  }
}

export default Marker
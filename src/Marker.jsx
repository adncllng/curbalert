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

  handleHover = () => {
    this.props.hoverState(this.props.$dimensionKey)
  }

  handleMouseLeave = () => {
    this.props.clearHoverState();
  };

  render() {
    let img_url;
    if (this.props.markerParams.id == this.props.$dimensionKey) {
      img_url = 'http://res.cloudinary.com/ninayujiri/image/upload/v1528809683/trash-pin.png'
    } else {
      img_url = 'http://res.cloudinary.com/ninayujiri/image/upload/v1528586685/pin-red.svg'
    }

    return (
      <img
        src={img_url}
        onClick={this.handleClick}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleMouseLeave}
        style={{
          width: '32px'
        }}
      />
    );
  }
}

export default Marker
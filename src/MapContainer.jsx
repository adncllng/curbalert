import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import ReactDOM from 'react-dom'

const Marker = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

class MapContainer extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      posts: this.props.posts
    }
  }

  static defaultProps = {
    center: {lat: 45.5017, lng: -73.5673},
    zoom: 11
  };

  componentDidMount() {
    this.props.createPostList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ posts: nextProps.posts })
  }

  render() {
      const markers = this.state.posts.map(marker =>
        <Marker
          key={marker.id}
          lat={marker ? marker.geo_tag.x : ''}
          lng={marker ? marker.geo_tag.y : ''}
          text={marker ? marker.title : ''}
        />
      )
    return (
       <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          {markers}
      </GoogleMapReact>
    );
  }
}

export default MapContainer
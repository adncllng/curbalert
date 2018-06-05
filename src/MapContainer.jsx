import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';

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

class MapContainer extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      posts: this.props.posts
    }
  }

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

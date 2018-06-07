import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import Marker from "./Marker.jsx";
import PostModal from "./PostModal.jsx";


class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
    };
  }

  componentDidMount() {
    this.props.createPostList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ posts: nextProps.posts })
  }

  toggleModal = key => {
    let thisPost = null;
      this.state.posts.forEach((post, i) => {
      if (post.id == key) {
       thisPost = post
      }
    })
    this.props.showModal(thisPost)
  }

  render() {
    const markers = this.state.posts.map(marker =>
      <Marker
        key={marker.id}
        lat={marker ? marker.geo_tag.x : ''}
        lng={marker ? marker.geo_tag.y : ''}
        text={marker ? marker.title : ''}
        toggleModal={this.toggleModal}
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

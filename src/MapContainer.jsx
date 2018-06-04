import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class MapContainer extends Component {
  // state = {
  //   locations: [
  //     { name: "Bookshelf", location: {lat: 45.4768, lng: -73.5842} },
  //     { name: "Radio", location: {lat: 45.4548, lng: -73.5699} },
  //     { name: "Houseplant", location: {lat: 45.4914, lng: -73.5605} },
  //     { name: "Bike", location: {lat: 45.5017, lng: -73.5673} },
  //     { name: "Dresser", location: {lat: 45.5232, lng: -73.587} }
  //   ]
  // }

  componentDidMount() {
    this.loadMap(); // call loadMap function to load the google map
    this.props.createPostList();
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 45.5017, lng: -73.5673},
        zoom: 13
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

      console.log(this.props)

      let posts = null;
      if(this.props.posts.length) {
        this.state.props.posts.forEach( post => {
          const marker = new google.maps.Marker({
            position: {lat: post.geo_tag.x, lng: post.geo_tag.y},
            map: this.map,
            title: post.title
          });
        })
      }

    }
  }

  render() {
    const style = {
      width: '100%',
      height: '700px'
    }

    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    )
  }
}

export default MapContainer;

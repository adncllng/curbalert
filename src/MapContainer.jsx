import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker.jsx";

class MapContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (!this.props.posts.length) {
			this.props.createPostList();
		}
	}

	toggleModal = key => {
		let thisPost = null;
		this.props.posts.forEach((post, i) => {
			if (post.id == key) {
				thisPost = post;
			}
		});
		this.props.showModal(thisPost);
	};

	render() {
		const markers = this.props.posts
			.filter(post => post.visible)
			.map(marker => (
				<Marker
					className="marker"
					key={marker.id}
					lat={marker ? marker.geo_tag.x : ""}
					lng={marker ? marker.geo_tag.y : ""}
					text={marker ? marker.title : ""}
					toggleModal={this.toggleModal}
					markerParams={this.props.markerParams}
				/>
			));
		return (
			<GoogleMapReact center={this.props.center} zoom={this.props.zoom} onChange={({ center, zoom, bounds, marginBounds })=>{
        console.log(center, zoom, bounds, marginBounds )
      }}>
				{markers}
			</GoogleMapReact>
		);
	}
}

export default MapContainer;

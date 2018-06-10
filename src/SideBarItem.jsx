import React, { Component } from "react";
import moment from "moment";
import "./styles/scss/App.css";

class SideBarItem extends Component {
	constructor(props) {
		super(props);
	}

	handlePostClick = () => {
		this.props.toggleModal(this.props.id);
		this.props.centerZoom(this.props.post.geo_tag.x, this.props.post.geo_tag.y);
	};

	// onMouseEnterHandler = () => {
	// 	this.props.centerZoom(this.props.post.geo_tag.x, this.props.post.geo_tag.y);
	// };

	// onMouseExitHandler = () => {
	// 	this.props.centerZoom(
	// 		this.props.post.geo_tag.x,
	// 		this.props.post.geo_tag.y,
	// 		11
	// 	);
	// };

	handleMouseEnter = () => {
		this.props.hoverState(this.props.id);
	};

	handleMouseLeave = () => {
		this.props.clearHoverState();
	};


	render() {
		return (
			<ul
				className="menu-list">
				<br />
				<li>
					<a
						onClick={this.handlePostClick}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}>
						{this.props.title}
						<button
							style={{ marginBottom: "10px" }}
							className="button is-small is-outlined is-pulled-right">
							Details
						</button>
						<img src={this.props.image} style={{ maxWidth: "100%" }} />
						<div className="date-posted" style={{ paddingTop: "10px" }}>
							<small>(Posted {moment(this.props.created_at).fromNow()})</small>
						</div>
					</a>
				</li>
				<br />
			</ul>
		);
	}
}

export default SideBarItem;

import React, { Component } from "react";
import moment from "moment";
import "./styles/scss/App.css";

class SideBarItem extends Component {
	constructor(props) {
		super(props);
	}

	handlePostClick = () => {
		this.props.toggleModal(this.props.id);
	};

	onMouseEnterHandler = () => {
		this.props.centerZoom(this.props.post.geo_tag.x, this.props.post.geo_tag.y);
	};

	onMouseExitHandler = () => {
		this.props.centerZoom(
			this.props.post.geo_tag.x,
			this.props.post.geo_tag.y,
			12
		);
	};

	handleMouseEnter = () => {
		this.props.hoverState(this.props.id);
	};

	handleMouseLeave = () => {
		this.props.clearHoverState();
	};

	render() {
		return (
			<ul
				onClick={this.handlePostClick}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onMouseEnter={this.onMouseEnterHandler}
				onMouseLeave={this.onMouseExitHandler}
				className="menu-list">
				<br />
				<li>
					<div className="card">
						<div className="card-image">
							<figure className="image">
								<img src={this.props.image} style={{ maxWidth: "100%" }} />
							</figure>
						</div>
						<div className="card-content">
							<div className="media">
								<div className="media-content">
									<p className="title is-4">{this.props.title}</p>
								</div>
							</div>
							<small>(Posted {moment(this.props.created_at).fromNow()})</small>
							<br />
							<hr />
							<a className="is-centered">Click for details</a>
						</div>
					</div>
				</li>
				<br />
			</ul>
		);
	}
}

export default SideBarItem;

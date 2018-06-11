import React, { Component } from "react";
import moment from "moment";
import Geocode from "react-geocode";
import "./styles/scss/SideBarItem.css";

class SideBarItem extends Component {
	constructor(props) {
		super(props);
	}

	handlePostClick = () => {
		this.props.toggleModal(this.props.id);
		this.props.centerZoom(this.props.post.geo_tag.x, this.props.post.geo_tag.y);
	};

	handleMouseEnter = () => {
		this.props.hoverState(this.props.id);
	};

	handleMouseLeave = () => {
		this.props.clearHoverState();
	};

	render() {
		return (
			<ul className="menu-list">
				<br />
				<li className="side-bar-item">
					<a
						onClick={this.handlePostClick}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}
						className="side-bar-item-toggle">
						<div className="is-size-6">
							{this.props.title}
							<i id="eye" className="fa fa-eye"/>
						</div>
						<div className="side-bar-item-content">
						 	<br/>
							<img src={this.props.image} style={{ maxWidth: "50%" }} />
							<div className="date-posted" style={{ paddingTop: "10px" }}>
								<div>{this.props.address}</div>
								<div className="side-bar-item-inner">
									<br />
									<small>
										(Posted {moment(this.props.created_at).fromNow()})
									</small>
								</div>
							</div>
						</div>
					</a>
				</li>
				<hr style={{ margin: "0" }} />
			</ul>
		);
	}
}

export default SideBarItem;

import React, { Component } from "react";
import moment from "moment";
import Geocode from "react-geocode";
import "./styles/scss/SideBarItem.css";

class SideBarItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getAddress(this.props.post);
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
						<p className="is-size-5">{this.props.title}</p><br/>
						<img src={this.props.image} style={{ maxWidth: "100%" }} />
						<div className="side-bar-item-content">
							<div className="date-posted" style={{ paddingTop: "10px" }}>
								<div>{`${this.props.geoAddress}`}</div>
								<div className="side-bar-item-inner">
									{/* {`${this.props.post.geo_tag.x} ${this.props.post.geo_tag.y}`} */}
									<br/>
									<small>
										(Posted {moment(this.props.created_at).fromNow()})
									</small>
								</div>
							</div>
						</div>
					</a>
				</li>
				<br />
			</ul>
		);
	}
}

export default SideBarItem;

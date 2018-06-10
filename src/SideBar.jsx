import React, { Component } from "react";
import SideBarItem from "./SideBarItem.jsx";
import Geocode from "react-geocode";
import "./styles/scss/SideBar.css";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flash: "",
			search: "",
			latitude: Infinity,
			longitude: Infinity
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClear = () => {
		this.setState({
			searchTag: "",
			recenterLocation: ""
		});
	};

	handleRecenterSubmit = e => {
		e.preventDefault();
		Geocode.fromAddress(this.state.recenterLocation)
			.catch(err => {
				this.setState({
					flash: "Invalid address"
				});
				setTimeout(() => {
					this.setState({
						flash: ""
					});
				}, 3000);
			})
			.then(response => {
				if (response === undefined) {
					console.log("afdasf");
				} else {
					let coordinates = response.results[0].geometry.location;
					const { lat, lng } = coordinates;
					this.props.centerZoom(lat, lng, 12);
				}
			});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		let foundPosts = this.props.posts.filter(post => {
			return post.tags.indexOf(this.state.searchTag) > -1;
		});
		this.props.filterPosts(foundPosts);
	};

	toggleModal = key => {
		let thisPost = null;
		this.props.posts.forEach((post, i) => {
			if (post.id == key) {
				thisPost = post;
			}
		});
		this.props.showModal(thisPost);
	};

	hoverState = key => {
		let thisPost = null;
		this.props.posts.forEach((post, i) => {
			if (post.id == key) {
				thisPost = post;
			}
		});
		this.props.hoverMarker(thisPost);
	};

	clearHoverState = () => {
		this.props.clearHover();
	};

	render() {
		const searchForm = this.refs.searchForm;
		const recenterForm = this.refs.recenterForm;

		let posts = null;
		if (this.props.posts.length) {
			posts = this.props.posts.filter(post => post.visible).map(post => {
				return (
					<SideBarItem
						id={post.id}
						title={post.title}
						image={post.image_url}
						created_at={post.created_at}
						toggleModal={this.toggleModal}
						hoverState={this.hoverState}
						clearHoverState={this.clearHoverState}
						centerZoom={this.props.centerZoom}
						post={post}
					/>
				);
			});

			return (
				<aside className="menu column is-fullheight has-shadow">
					<div className="column">
						<form onSubmit={this.handleRecenterSubmit} ref="recenterForm">
							<br />
							<div className="field">
								<p className="control has-icons-left">
									<input
										style={{ width: "100%" }}
										className="input"
										type="recenter"
										placeholder="Enter a location"
										name="recenterLocation"
										onChange={this.handleChange}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-map" />
									</span>
								</p>
							</div>
							<button className="button is-light" style={{ width: "100%" }}>
								Submit
							</button>
						</form>
						<br />
						<button
							style={{ width: "100%" }}
							className="button is-outlined"
							onClick={() => {
								this.props.clearSearchForm(recenterForm);
								this.handleClear();
							}}>
							New Location
						</button>
						<p>{this.state.flash}</p>
						<form onSubmit={this.handleFormSubmit} ref="searchForm">
							<br />
							<div className="field">
								<p className="control has-icons-left">
									<input
										style={{ width: "100%" }}
										className="input"
										type="search"
										placeholder="Search"
										name="searchTag"
										onChange={this.handleChange}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-search" />
									</span>
								</p>
							</div>
							<button style={{ width: "100%" }} className="button is-light">
								Submit
							</button>
						</form>
						<br />
						<button
							style={{ width: "100%" }}
							className="button is-outlined"
							onClick={() => {
								this.props.resetPosts();
								this.props.clearSearchForm(searchForm);
								this.handleClear();
							}}>
							New Search
						</button>
					</div>
					{posts.reverse()}
				</aside>
			);
		} else {
			return (
				<div style={{ margin: "30px" }}>
					<p>No results found 👀</p>
					<br />
					<button
						style={{ width: "100%" }}
						className="button is-outlined"
						onClick={this.props.resetPosts}>
						New Search
					</button>
				</div>
			);
		}
	}
}

export default SideBar;

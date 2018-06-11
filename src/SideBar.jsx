import React, { Component } from "react";
import SideBarItem from "./SideBarItem.jsx";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
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

	handleDropdown = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.centerZoom(latLng.lat, latLng.lng, 11))
			.then(() => this.setState({ address: "" }))
			.catch(error => console.error("Error", error));
	};

	handleClear = () => {
		this.setState({
			searchTag: "",
			recenterLocation: ""
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
						<form onSubmit={this.handleRecenterSubmit} ref="recenterForm">							<div className="field">
								<p className="control has-icons-left">
									<PlacesAutocomplete
										value={this.state.address}
										onChange={this.handleDropdown}
										onSelect={this.handleSelect}>
										{({
											getInputProps,
											suggestions,
											getSuggestionItemProps
										}) => (
											<div>
												<input
													{...getInputProps({
														placeholder: "Search Places ...",
														className: "location-search-input"
													})}
													style={{ width: "100%" }}
													className="input"
													placeholder="Enter a location"
												/>
												<div className="autocomplete-dropdown-container">
													{suggestions.map(suggestion => {
														const className = suggestion.active
															? "suggestion-item--active"
															: "suggestion-item";
														const style = suggestion.active
															? {
																	backgroundColor: "#fafafa",
																	cursor: "pointer"
															  }
															: {
																	backgroundColor: "#ffffff",
																	cursor: "pointer"
															  };
														return (
															<div
																{...getSuggestionItemProps(suggestion, {
																	className,
																	style
																})}>
																<span>{suggestion.description}</span>
															</div>
														);
													})}
												</div>
											</div>
										)}
									</PlacesAutocomplete>
									<span className="icon is-small is-left">
										<i className="fa fa-map" />
									</span>
								</p>
							</div>
						</form>
						<p>{this.state.flash}</p>
						<form onSubmit={this.handleFormSubmit} ref="searchForm">
						<hr/>
							<div className="field has-addons">
								<div className="control is-expanded">
									<input
										className="input"
										type="search"
										placeholder="I'm looking for..."
										name="searchTag"
										onChange={this.handleChange}
									/>
								</div>
								<div className="control">
									<button className="button is-success">
										<i className="fa fa-search" />
									</button>
								</div>
							</div>
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

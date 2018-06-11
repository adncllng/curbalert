import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
import "./styles/scss/NewPost.css";

const vision = require("node-cloud-vision-api");
vision.init({ auth: process.env.REACT_APP_GOOGLE_API_KEY });

class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trashPicUrl: null,
			trashTags: [],
			title: null,
			trashTag: "",
			content: null
		};
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({ [event.target.name]: event.target.value });
	};

	addTag = event => {
		event.preventDefault();
		this.setState({
			trashTags: [...this.state.trashTags, this.state.trashTag],
			trashTag: ""
		});
	};

	removeTag = event => {
		event.preventDefault();
		let newtags = this.state.trashTags.filter(tag => tag != event.target.name);
		this.setState({
			trashTags: newtags
		});
	};

	componentDidMount() {
		axios
			.get("http://localhost:3001/")
			.then(function(response) {
				console.log(response.data);
				//set state for trash posts
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	handleDrop = files => {
		// Push all the axios request promise into a single array
		const uploaders = files.map(file => {
			// Initial FormData
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `codeinfuse, medium, gist`);
			formData.append("upload_preset", "iyxcz7xd");
			formData.append("api_key", process.env.REACT_APP_VISION_API_KEY);
			formData.append("timestamp", (Date.now() / 1000) | 0);

			// Make an upload request to cloudinary
			return axios
				.post(
					"https://api.cloudinary.com/v1_1/trasher/image/upload/",
					formData,
					{
						headers: { "X-Requested-With": "XMLHttpRequest" }
					}
				)
				.then(response => {
					const data = response.data;
					const fileURL = data.secure_url; //URL for future references
					const url = data.url;
					console.log(data);

					this.setState({
						trashPicUrl: data.url,
						trashTitle: data.original_filename
					});

					console.log(data.url);
					// VISION part - takes url and responds with labes
					const req = new vision.Request({
						image: new vision.Image({
							url: url
						}),
						features: [new vision.Feature("LABEL_DETECTION", 10)]
					});

					vision.annotate(req).then(
						res => {
							// handling response from VISION
							if (res.responses[0].labelAnnotations) {
								let tags = res.responses[0].labelAnnotations.map(ann => {
									return ann.description;
								});
								this.setState({
									trashTags: tags
								});
							}
						},
						e => {
							console.log("Error: ", e);
						}
					);
				});
		});
		// Once all the files are uploaded
		axios.all(uploaders).then(() => {});
	};

	handleDropdown = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		let latLng;
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(coordinates => (latLng = coordinates))
			.then(() => this.props.centerZoom(latLng.lat, latLng.lng, 11))
			.then(() => this.setState({ geo_tag: `${latLng.lat}, ${latLng.lng}` }))
			.catch(error => console.error("Error", error));
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if(this.state.trashTags.length){
		Geocode.fromAddress(this.state.address)
			.then(response => {
				const { lat, lng } = response.results[0].geometry.location;
				this.setState({ geo_tag: `${lat}, ${lng}` });

				const data = {
					user_id: this.props.currentUser.id, //need to get the user id
					title: this.state.title,
					content: this.state.content, // need to get the content
					image_url: this.state.trashPicUrl,
					geo_tag: this.state.geo_tag,
					point_value: 1,
					tags: this.state.trashTags,
					visible: true,
					address: this.state.address
				};

				axios
					.post("http://localhost:3001/api/posts", data)
					.then(res => {
						let newPost = res.data[0];
						let newPostWithAddress = {
							...newPost,
							address: this.state.address
						};

						this.props.addPost(newPostWithAddress);

						this.props.closeAddPostModal();
						this.setState({
							trashPicUrl: null,
							trashTags: [],
							trashTitle: null,
							trashTag: null
						});
					})
					.catch(err => {
						this.setState({
							flash: err.message
						});
						setTimeout(() => {
							this.setState({
								flash: ""
							});
						}, 3000);
					});
			})
			.catch(err => {
				this.setState({
					flash: err.message
				});
				setTimeout(() => {
					this.setState({
						flash: ""
					});
				}, 3000);
			});
		}else{
			this.setState({
				flash:"add some tags"
			})
		}
	};

	render() {
		let { trashPicUrl, trashTags } = this.state;
		let trashPic = null;
		let tags = null;
		trashPicUrl
			? (trashPic = (
					<img
						style={{ minWidth: "100%", minHeight: "100%" }}
						src={trashPicUrl}
					/>
			  ))
			: (trashPic = null);

		if (trashTags) {
			tags = trashTags.map(tag => {
				return (
					<div className="control">
						<div className="tags has-addons">
							<a className="tag is-link">{tag}</a>
							<a
								className="tag is-delete"
								name={tag}
								onClick={this.removeTag}
							/>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="modal is-active is-mobile" style={{ zIndex: "101" }}>
				<form onSubmit={this.handleFormSubmit}>
					<div className="modal-background" />
					<div className="modal-card">
						<header className="modal-card-head">
							<p className="modal-card-title">Add a post</p>
							<button
								className="delete"
								onClick={this.props.closeAddPostModal}
								aria-label="close"
							/>
						</header>
						<section className="modal-card-body upload-form is-mobile">
							<div className="media-content">
								<div className="columns">
									<div className="media-left column is-one-third is-mobile">
										<Dropzone
											onDrop={this.handleDrop}
											multiple
											accept="image/*">
											{trashPic || "click or drag and drop an image"}
										</Dropzone>
									</div>
									<div className="column is-two-thirds is-mobile">
										<div className="field">
											<input
												className="input"
												type="text"
												placeholder={this.state.title || "Title"}
												name="title"
												onChange={this.handleChange}
											/>
										</div>
										<div className="field">
											<textarea
												onChange={this.handleChange}
												className="textarea"
												name="content"
												placeholder="Description"
											/>
										</div>
										<p className="control has-icons-left">
											<PlacesAutocomplete
												value={this.state.address}
												onChange={this.handleDropdown}
												onSelect={this.handleSelect(this.state.address)}>
												{({
													getInputProps,
													suggestions,
													getSuggestionItemProps
												}) => (
													<div>
														<div className="field">
															<input
																{...getInputProps({
																	placeholder: "Search Places ...",
																	className: "location-search-input"
																})}
																style={{ width: "100%" }}
																className="input"
																placeholder="Location (i.e. H4C 1J7 or 1234 Example St.)"
															/>
														</div>
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
												<i className="fas fa-map" />
											</span>
										</p>
										<div className="field is-grouped">
											<p className="control is-expanded">
												<input
													name="trashTag"
													placeholder="add tags"
													onChange={this.handleChange}
													className="input"
													type="text"
													value={this.state.trashTag}
												/>
											</p>
											<p className="control">
												<a className="button is-success" onClick={this.addTag}>
													+ tag
												</a>
											</p>
										</div>
										<nav>
											<div className="level-left">
												<div
													style={{ width: "350px" }}
													className="field is-grouped is-grouped-multiline">
													{tags}
												</div>
											</div>
										</nav>
									</div>
								</div>
							</div>
						</section>
						<footer className="modal-card-foot">
							<button className="button is-success">Upload</button>
							<p>{this.state.flash}</p>
						</footer>
					</div>
				</form>
			</div>
		);
	}
}

export default NewPost;

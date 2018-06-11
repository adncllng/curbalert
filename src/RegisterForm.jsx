import React, { Component } from "react";
import axios from "axios";
import AuthService from "./AuthService.jsx";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
import { Link } from "react-router-dom";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			username: "",
			password: "",
			passwordConfirm: "",
			address: "",
			geo_tag: ""
		};
		this.Auth = new AuthService();
	}

	componentWillMount() {
		if (this.Auth.loggedIn()) window.location.assign("/");
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
		let latLng;
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(coordinates => (latLng = coordinates))
			.then(() => this.props.centerZoom(latLng.lat, latLng.lng, 11))
			.then(() => this.setState({ geo_tag: `${latLng.lat}, ${latLng.lng}` }))
			.catch(error => console.error("Error", error));
	};

	handleFormSubmit = e => {
		e.preventDefault();

		axios
			.post("http://localhost:3001/api/users/register", {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
				passwordConfirm: this.state.passwordConfirm,
				geo_tag: this.state.geo_tag,
				points: 1
			})
			.then(res => {
				localStorage.setItem("id_token", res.data.token);
				localStorage.setItem("email", this.state.email);
				this.props.getUser();
				window.location.assign("/");
			})
			.catch(err => {
				this.setState({
					flash: 'Email or username are already taken'
				});
				setTimeout(() => {
					this.setState({
						flash: ""
					});
				}, 3000);
			});

	};

	render() {
		return (
			<div className="modal-card">
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<section className="modal-card-body register-form">
						<br />
						<p className="modal-card-title">Join the network</p>
						<br /><small>
						Already have an account?<Link to={"/login"}> Login</Link></small>
						<br /><br />
						<div className="columns is-multiline is-mobile">
							<div className="column is-full">
								<p className="control has-icons-left">
									<input
										className="input"
										type="email"
										placeholder="Email"
										name="email"
										value={this.state.email}
										onChange={e => this.handleChange(e)}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-envelope" />
									</span>
								</p>
							</div>

							<div className="column is-full">
								<p className="control has-icons-left">
									<input
										className="input"
										type="username"
										placeholder="Username"
										name="username"
										value={this.state.username}
										onChange={e => this.handleChange(e)}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-user" />
									</span>
								</p>
							</div>

							<div className="column is-half">
								<p className="control has-icons-left">
									<input
										className="input"
										type="password"
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={e => this.handleChange(e)}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-lock" />
									</span>
								</p>
							</div>

							<div className="column is-half">
								<p className="control has-icons-left">
									<input
										className="input"
										type="password"
										placeholder="Password Confirmation"
										name="passwordConfirm"
										value={this.state.passwordConfirm}
										onChange={e => this.handleChange(e)}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-lock" />
									</span>
								</p>
							</div>

							<div className="column is-full">
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
												<input
													{...getInputProps({
														placeholder: "Search Places ...",
														className: "location-search-input"
													})}
													style={{ width: "100%" }}
													className="input"
													placeholder="Address (i.e. H4C 1J7 or 1234 Example St.)"
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
										<i className="fas fa-home" />
									</span>
								</p>
							</div>
						</div>

						<button className="button is-success is-rounded">Create Account</button>
						<br/>
						<small>{this.state.flash}</small>
					</section>
				</form>
			</div>
		);
	}
}

export default RegisterForm;

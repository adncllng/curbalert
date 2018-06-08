import React, { Component } from "react";
import axios from "axios";
import AuthService from "./AuthService.jsx";
import Geocode from "react-geocode";
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
		if (this.Auth.loggedIn()) window.location.assign('/');
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleFormSubmit = e => {
		e.preventDefault();

		Geocode.fromAddress(this.state.address).then(
			response => {
				const { lat, lng } = response.results[0].geometry.location;
				this.setState({ geo_tag: `${lat}, ${lng}` });

				axios
					.post("http://localhost:3001/users/register", {
						email: this.state.email,
						username: this.state.username,
						password: this.state.password,
						passwordConfirm: this.state.passwordConfirm,
						geo_tag: this.state.geo_tag
					})
					.then(res => {
						localStorage.setItem("id_token", res.data.token);
						localStorage.setItem("email", this.state.email);
						this.props.getUser();
						window.location.assign('/');
					});
			},
			error => {
				console.error(error);
			}
		);
	}

	render() {
		return (
			<div className="modal-card">
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<section className="modal-card-body">
						<br />
						<p className="modal-card-title">Register</p>
						<br />

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

							<div className="column">
								<p className="control has-icons-left">
									<input
										className="input"
										type="address"
										placeholder="Address (i.e. H4C 1J7 or 1234 Example St.)"
										autoComplete="address-level2"
										name="address"
										value={this.state.address}
										onChange={e => this.handleChange(e)}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-home"></i>
									</span>
								</p>
							</div>
						</div>

						<button className="button is-light wide">Register</button>
					</section>
				</form>
					<div>
						<p>Already have an account?<Link to={'/login'}> Login</Link></p>
					</div>
			</div>
		);
	}
}

export default RegisterForm;

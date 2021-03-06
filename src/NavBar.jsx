import React, { Component } from "react";
import AuthService from "./AuthService.jsx";
import { Link } from "react-router-dom";
import "./styles/scss/NavBar.css";
import bulmaBadge from '../node_modules/bulma-extensions/bulma-badge/dist/bulma-badge.min.css';


class NavBar extends Component {
	constructor(props) {
		super(props);
		this.Auth = new AuthService();
	}

	toggleBurger = () => {
		const burger = this.refs.burger;
		const menu = this.refs.menu;
		if (burger.className.includes("is-active")) {
			burger.className = "navbar-burger";
			menu.className = "navbar-menu";
		} else {
			burger.className += " is-active";
			menu.className += " is-active";
		}
	};

	render() {
		let navBar;
		if (this.Auth.loggedIn()) {
			navBar = (
				<nav className="navbar fixed has-shadow">
					<div className="navbar-brand">

					<Link to={'/'} className="navbar-item brand">
						<img src="http://res.cloudinary.com/ninayujiri/image/upload/v1528768341/log.png" className="logo"/>
					</Link>
						<a
							role="button"
							className="navbar-burger"
							data-target="navMenu"
							ref="burger"
							onClick={this.toggleBurger}>
							<span />
							<span />
							<span />
						</a>
					</div>
					<div id="navMenu" className="navbar-menu" ref="menu">
						<div className="navbar-start">
							<Link
								to={"/posts"}
								className="navbar-item"
								onClick={this.toggleBurger}>
								All Posts
							</Link>
							<div className="navbar-start">
								<a
									onClick={event => {
										this.props.showAddPostModal();
										this.toggleBurger();
									}}
									className="navbar-item">
									Add Post
								</a>
							</div>
						</div>

					<div className="navbar-end" aria-label="dropdown navigation">

						<div className="navbar-item has-dropdown is-hoverable">
						<a className="navbar-link"><span className="badge is-badge-light is-badge-small" data-badge={this.props.currentUser.points}>{this.props.username}</span></a>
						<div className="navbar-dropdown is-right">
									<Link
										className="navbar-item"
										to={"/profile"}
										type="button is-active">
										Profile
									</Link>
							<hr className="navbar-divider" />
							<a
								className="navbar-item"
								type="button"
								onClick={() => {
									this.Auth.logout();
									this.props.logout();
								}}>
								Logout
							</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
			);
		} else {
			navBar = (
				<nav className="navbar fixed has-shadow">
					<div className="container">
						<div className="navbar-brand">
						<Link to={'/'} className="navbar-item brand">
							<img src="http://res.cloudinary.com/ninayujiri/image/upload/v1528768341/log.png" style={{paddingLeft: '0px'}}className="logo"/>
						</Link>
							<a
								role="button"
								className="navbar-burger"
								data-target="navMenu"
								ref="burger"
								onClick={this.toggleBurger}>
								<span />
								<span />
								<span />
							</a>
						</div>
						<div id="navMenu" className="navbar-menu" ref="menu">
							<div className="navbar-end">
								<Link
									to={"/login"}
									className="navbar-item"
									onClick={this.toggleBurger}>
									Login
								</Link>
								<Link
									to={"/register"}
									className="navbar-item"
									onClick={this.toggleBurger}>
									Join
								</Link>
							</div>
					</div>
				</div>
			</nav>

			);
		}

		return (
			<nav className="navbar fixed has-shadow">
				{navBar}
			</nav>
		);
	}
}

export default NavBar;

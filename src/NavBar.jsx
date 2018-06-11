import React, { Component } from "react";
import AuthService from "./AuthService.jsx";
import { Link } from "react-router-dom";

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
		let navEnd;
		if (this.Auth.loggedIn()) {
			navEnd = (
				<div className="navbar-end" aria-label="dropdown navigation">
		      <div className="navbar-item has-dropdown is-hoverable">
		        <a className="navbar-link">
		          {this.props.username}
		        </a>
		        <div className="navbar-dropdown is-right">
			        <Link
								className="navbar-item"
								to={"/profile"}
								type="button is-active"
								>
								Profile
							</Link>
							<hr className="navbar-divider"/>
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
			);
		} else {
			navEnd = (
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
						Register
					</Link>
				</div>
			);
		}

		return (
			<nav className="navbar fixed">
					<div className="navbar-brand">

					<Link to={'/'} className="navbar-item brand">
						<img src="http://res.cloudinary.com/ninayujiri/image/upload/v1528729525/logo.png" className="logo"/>
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
							<a onClick={(event) => {this.props.showAddPostModal(); this.toggleBurger();}} className="navbar-item">
								Add Post
							</a>
						</div>
					</div>
					{navEnd}
				</div>
			</nav>
		);
	}
}

export default NavBar;

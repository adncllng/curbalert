import React, { Component } from "react";
import AuthService from "./AuthService.jsx";
import { Link } from "react-router-dom";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.Auth = new AuthService();
	}

	state = {
		isActive: false,
		isLoggedOut: false
	};

	toggleNav = () => {
		this.setState(prevState => ({
			isActive: !prevState.isActive
		}));
	};

	renderNav = () => {
		this.setState(prevState => ({
			isLoggedOut: true
		}));
	};

	render() {
		let navEnd;
		if (this.Auth.loggedIn()) {
			navEnd = (
				<div className="navbar-end">
					<div className="navbar-item">
						<p>Hi, {this.props.username}</p>
					</div>
					<div className="navbar-item">
						<a
							type="button"
							className="is-dark"
							onClick={() => {
								this.Auth.logout();
								this.renderNav();
							}}>
							Logout
						</a>
					</div>
				</div>
			);
		} else {
			navEnd = (
				<div className="navbar-end">
          <Link to={'/login'} className="navbar-item">Login</Link>
          <Link to={'/register'} className="navbar-item">Register</Link>
				</div>
			);
		}

		return (
			<nav className="navbar has-shadow fixed">
				<div className="container">
					<div className="navbar-brand">

					<Link to={'/'} className="navbar-item">
							<img src="http://res.cloudinary.com/ninayujiri/image/upload/v1528381939/logo.png" className="logo"/>
					</Link>
						<div className="navbar-burger burger" data-target="navMenu" onClick={this.toggleNav}>
							<span></span>
							<span></span>
							<span></span>
						</div>

					</div>
					<div id="navMenu" className="navbar-menu">
						<div className="navbar-start">
            <Link to={'/posts/new'} className="navbar-item">Add Post</Link>
              <Link to={'/posts'} className="navbar-item">All Posts</Link>


						</div>

              { navEnd }

            </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;

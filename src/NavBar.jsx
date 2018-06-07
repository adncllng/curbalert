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
	}

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
								this.props.logout();
							}}>
							Logout
						</a>
					</div>
				</div>
			);
		} else {
			navEnd = (
				<div className="navbar-end">
					<Link to={"/login"} className="navbar-item" onClick={this.toggleBurger}>
						Login
					</Link>
					<Link to={"/register"} className="navbar-item" onClick={this.toggleBurger}>
						Register
					</Link>
				</div>
			);
		}

		return (
			<nav className="navbar has-shadow fixed">
				<div className="navbar-brand">
					<Link to={"/"} className="navbar-item">
						<img
							src="http://res.cloudinary.com/ninayujiri/image/upload/v1528381939/logo.png"
							className="logo"
						/>
					</Link>
					<a
						role="button"
						className="navbar-burger"
						data-target="navMenu"
						ref="burger"
						onClick={this.toggleBurger}
						>
						<span />
						<span />
						<span />
					</a>
				</div>
				<div id="navMenu" className="navbar-menu" ref="menu">
					<div className="navbar-start">
						<Link to={"/posts/new"} className="navbar-item" onClick={this.toggleBurger}>
							Add Post
						</Link>
						<Link to={"/posts"} className="navbar-item" onClick={this.toggleBurger}>
							All Posts
						</Link>
					</div>
<<<<<<< HEAD
					<div id="navMenu" className="navbar-menu">
						<div className="navbar-start">
            <a onClick={this.props.showAddPostModal} className="navbar-item">Add Post</a>
              <Link to={'/posts'} className="navbar-item">All Posts</Link>


						</div>

              { navEnd }

            </div>
        </div>
      </nav>
    )
  }
=======
					{navEnd}
				</div>
			</nav>
		);
	}
>>>>>>> 6f31be8153bde4e870ddb00dee84b27a5374fe52
}

export default NavBar;

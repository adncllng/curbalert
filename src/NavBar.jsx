import React, { Component } from 'react';
import AuthService from "./AuthService.jsx";
import './styles/scss/App.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  state = {
    isActive: false,
    isLoggedOut: false
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  renderNav = () => {
    this.setState(prevState => ({
      isLoggedOut: true
    }))
  }

  render() {
    let navEnd;
    if(this.Auth.loggedIn()) {
      navEnd = (
        <div className="navbar-end">
          <div className="navbar-item">
            <p>Hi, username</p>
          </div>
          <div className="navbar-item">
            <a
              type="button"
              className="is-dark"
              onClick={() => { this.Auth.logout(); this.renderNav(); }}
            >
              Logout
            </a>
          </div>
        </div>
      )
    } else {
      navEnd = (
        <div className="navbar-end">
          <a className="navbar-item" href="/login">
            Login
          </a>
          <a type="button" className="navbar-item" href="/register">
            Register
          </a>
        </div>
      )
    }

    return (
      <nav className="navbar has-shadow">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item brand-text" href="/">
                  Curb Alert
                </a>
                <div className="navbar-burger burger" data-target="navMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item" href="/posts/new">
                  New Post
                </a>
                <a className="navbar-item" href="/posts">
                  All Posts
                </a>
              </div>

                { navEnd }


            </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;

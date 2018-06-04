import React, { Component } from 'react';
import './styles/scss/App.css';


class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
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
                <a className="navbar-item" href="/login">
                  Login
                </a>
              </div>
            </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
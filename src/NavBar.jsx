import React, { Component } from 'react';
import './App.css';


class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav class="navbar is-white">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item brand-text" href="/">
                  Curb Alert
                </a>
                <div class="navbar-burger burger" data-target="navMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
            </div>
            <div id="navMenu" class="navbar-menu">
              <div class="navbar-start">
                <a class="navbar-item" href="">
                  New Post
                </a>
                <a class="navbar-item" href="">
                  All Posts
                </a>
                <a class="navbar-item" href="">
                  Profile
                </a>
                <a class="navbar-item" href="">
                  Logout
                </a>
              </div>
            </div>
        </div>
      </nav>
    )
  }
}


export default NavBar;
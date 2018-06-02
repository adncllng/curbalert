import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="http://res.cloudinary.com/ninayujiri/image/upload/v1527916815/curb-alert.png" alt="Curb Alert" width="200" />
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true">Login</span>
            <span aria-hidden="true">Register</span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
    )
  }
}

export default NavBar;
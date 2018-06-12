import React, { Component } from "react";
import "./styles/scss/App.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <small>© 2018 Curb Alert</small>
            <br/>
            <a href="https://github.com/adncllng/curbalert">
              <i className="fa fa-github"/>
            </a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/scss/Home.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-page">
        <section className="hero is-light is-medium header-image">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">A better way to street scavenge.</h1>
              <h2 className="subtitle">Because people get rid of good shit.</h2>
              <Link to={'/register'} className="button is-white">Get Started</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LandingPage

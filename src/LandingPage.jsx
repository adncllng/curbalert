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
        <section className="hero is-dark is-medium header-image">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Find freebies in your area.</h1>
              <Link to={'/register'} className="button is-white is-rounded">Get Started</Link>
            </div>
          </div>
        </section>
        <div className="container info-boxes">
          <div className="columns is-multiline">
            <div className="column is-one-third">
              <div className="card info-box">
                <div className="card-content">
                  <p className="is-size-5">
                  <i className="fas fa-recycle"></i>
                    <br/>Easily locate and collect <br/>recycled items.
                  </p>
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="card info-box">
                <div className="card-content">
                  <p className="is-size-5">
                  <i className="fas fa-money-bill-alt"></i>
                    <br/>Earn points for every post <br/>you make.
                  </p>
                </div>
              </div>
            </div>
            <div className="column is-one-third last">
              <div className="card info-box">
                <div className="card-content">
                  <p className="is-size-5">
                  <i className="fas fa-tree"></i>
                    <br/>Save items headed <br/>for the landfill.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
              <small>
                ©2018 <a href="https://github.com/adncllng/curbalert">Curb Alert</a>. All Rights Reserved.
              </small>
          </div>
        </footer>
      </div>
    );
  }
}

export default LandingPage

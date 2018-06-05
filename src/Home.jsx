import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import './styles/scss/App.css';


class Home extends Component {

  render() {
    return (
      <section className="hero is-light is-medium header-image">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              A better way to street scavenge.
            </h1>
            <h2 className="subtitle">
              Because people get rid of good shit.
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import SideBar from "./SideBar.jsx"
import './styles/scss/Home.css';
import './styles/scss/NavBar.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage">
      <section className="sidebar columns is-fullheight">
        <SideBar posts={this.props.posts}/>
      </section>
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
    </div>
    );
  }
}

export default Home;

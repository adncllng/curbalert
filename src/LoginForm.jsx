import React, { Component } from "react";
import AuthService from "./AuthService.jsx";
import axios from "axios";

// import { userLogin } from './actions.js';

class LoginForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  render() {
    return (
      <div className="modal-card">
        <form onSubmit={this.handleFormSubmit}>
        <section className="modal-card-body">
          <p className="modal-card-title">Login</p>
          <br/>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button className="button is-light">Submit</button>
        </section>
        </form>
      </div>
    );
  }

  handleChange(e) {
    // need to move this to action.js eventually
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });
  }
}

export default LoginForm;

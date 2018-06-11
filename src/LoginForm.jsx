import React, { Component } from "react";
import AuthService from "./AuthService.jsx";
import { Link } from "react-router-dom";
// import { browserHistory, useRouterHistory } from 'react-router';


class LoginForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn())window.location.assign('/');
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
      this.props.getUser();
      window.location.assign('/');
    })
    .catch(err => {
      alert(err);
    });
  }

  render() {
    return (
      <div className="column is-4 is-offset-4">
        <form onSubmit={this.handleFormSubmit}>
        <section className="modal-card-body login-form">
          <br/><p className="modal-card-title">Welcome back</p>
          <br/><small>Not part of the network yet?<Link to={'/register'}> Create an account.</Link></small>
          <br/><br/>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <button className="button is-success is-rounded">Sign in</button>
        </section>
        </form>
      </div>
    );
  }

}

export default LoginForm;

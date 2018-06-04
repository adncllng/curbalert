import React, { Component } from "react";
import axios from "axios";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      city: '',
      prov: '',
      country: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/users/register', {
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      city: this.state.city,
      prov: this.state.prov,
      country: this.state.country
    })
    .then(res => {
      localStorage.setItem('secret', res.data.token);
      console.log(res.data.token);
    });
  }

  render() {
    return (
      <div className="modal-card">
        <form onSubmit={e => this.handleFormSubmit(e)}>
        <section className="modal-card-body">
          <p className="modal-card-title">Register</p>
          <br/>

          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className="field">
            <label className="label">Username</label>
            <input
              className="input"
              type="username"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className="field">
            <label className="label">Password Confirmation</label>
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="passwordConfirm"
              value={this.state.passwordConfirm}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className="field">
            <label className="label">City</label>
            <input
              className="input"
              type="city"
              placeholder="City"
              autoComplete="address-level2"
              name="city"
              value={this.state.city}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className="field">
            <label className="label">Province</label>
            <input
              className="input"
              type="province"
              placeholder="Province"
              autoComplete="address-level1"
              name="province"
              value={this.state.province}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div className="field">
            <label className="label">Country</label>
            <input
              className="input"
              type="country"
              placeholder="Country"
              autoComplete='country-name'
              name="country"
              value={this.state.country}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <button className="button is-light">Register</button>
        </section>
        </form>
      </div>
    );
  }

}

export default RegisterForm;

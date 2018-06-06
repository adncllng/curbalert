import React, { Component } from "react";
import axios from "axios";
import AuthService from "./AuthService.jsx";


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
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
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
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      city: this.state.city,
      prov: this.state.prov,
      country: this.state.country
    })
    .then(res => {
      localStorage.setItem('id_token', res.data.token);
      console.log(res.data.token);

      this.props.history.replace("/");

    });
  }

  render() {
    return (

      <div className="modal-card">
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <section className="modal-card-body">
            <br/>
            <p className="modal-card-title">Register</p>
            <br/>

            <div className="columns is-multiline is-mobile">

              <div className="column is-full">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </p>
              </div>

              <div className="column is-full">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="username"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={e => this.handleChange(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </p>
              </div>

               <div className="column is-half">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </p>
              </div>

               <div className="column is-half">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirm"
                    value={this.state.passwordConfirm}
                    onChange={e => this.handleChange(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="column">
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

              <div className="column">
                <input
                  className="input"
                  type="prov"
                  placeholder="Province"
                  autoComplete="address-level1"
                  name="prov"
                  value={this.state.province}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div className="column">
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
            </div>

            <button className="button is-light wide">Register</button>

          </section>
        </form>
      </div>


    );
  }

}

export default RegisterForm;

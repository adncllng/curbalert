import React, { Component } from 'react';
import './styles/scss/App.css';


class SideBarItem extends Component {
  constructor(props) {
    super(props);
  }

  handlePostClick = () => {
    this.props.toggleModal(this.props.id)
  }

  render() {
    return (
      <ul className="menu-list">
        <br/>
        <li>
          <a onClick={this.handlePostClick}>
          {this.props.title}
          <button style={{marginBottom: '10px'}} className="button is-small is-outlined is-pulled-right">Details</button>
            <img src={this.props.image} style={{ maxWidth: "100%" }} />
          </a>
        </li>
        <br/>
      </ul>
    );
  }
}

export default SideBarItem

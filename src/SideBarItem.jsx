import React, { Component } from 'react';
import './styles/scss/App.css';


class SideBarItem extends Component {
  constructor(props) {
    super(props);
  }

  handlePostClick() {
    this.props.toggleModal(this.props.$dimensionKey)
  }

  render() {
    return (
      <ul className="menu-list">
        <li>
          <a onClick={this.handlePostClick}>
            {this.props.title}
            <img src={this.props.image} style={{ maxWidth: "100%" }} />
          </a>
        </li>
      </ul>
    );
  }
}

export default SideBarItem
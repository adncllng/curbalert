import React, { Component } from 'react';
import './styles/scss/App.css';


class SideBarItem extends Component {
  constructor(props) {
    super(props);
  }

  handlePostClick = () => {
    this.props.toggleModal(this.props.id)
  }
  onMouseEnterHandler = () => {
    console.log("enter")
    this.props.centerZoom(this.props.post.geo_tag.x,this.props.post.geo_tag.y)
}
onMouseExitHandler = () => {
  console.log("sxit")
  this.props.centerZoom(this.props.post.geo_tag.x,this.props.post.geo_tag.y, 14)
}


  handleMouseEnter = () => {
    this.props.hoverState(this.props.id)
  }

  handleMouseLeave = () => {
    this.props.clearHoverState()
  }

  render() {
    return (
      <ul onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseExitHandler}className="menu-list">

        <br/>
        <li>
          <a
            onClick={this.handlePostClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
          {this.props.title}
          <button
            style={{marginBottom: '10px'}}
            className="button is-small is-outlined is-pulled-right"
          >Details</button>
            <img src={this.props.image} style={{ maxWidth: "100%" }} />
          </a>
        </li>
        <br/>
      </ul>
    );
  }
}

export default SideBarItem

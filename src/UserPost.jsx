import React, { Component } from 'react';
import './styles/scss/userPost.css';


class UserPost extends Component {

  constructor(props) {
    super(props);
  }

  // handlePostClick = () => {
  //   this.props.toggleModal(this.props.id)
  // }

  render() {
    return (
      <ul className="user-post-list">
        <li>
          {this.props.title}
        </li>

      </ul>


      // <div className="column is-one-fourth is-mobile">
      //   <div className="card" ref="postCards">
      //     <div className="card-image">
      //       <figure className="image">
      //         <img src={this.props.image} style={{ maxWidth: "100%" }} />
      //       </figure>
      //     </div>
      //     <div className="card-content">
      //       <div className="media">
      //         <div className="media-content">
      //           <p className="title is-4">{this.props.title}</p>
      //         </div>
      //       </div>
      //       <div className="content">
      //         {this.props.content}
      //         <br />
      //         <br />
      //         <i className="fas fa-map-pin" /> {this.props.address}
      //         <br />
      //         <br />
      //         {/* <small>(Posted {moment(post.created_at).fromNow()})</small> */}
      //       </div>
      //     </div>
      //     <footer className="card-footer">
      //       <button
      //         // ref="deleteButton"
      //         name="deleteButton"
      //         // onclick={handleClick(postCards)}
      //         className="card-footer-item">
      //         Delete
      //       </button>
      //     </footer>
      //   </div>
      // </div>
    );
  }
}

export default UserPost

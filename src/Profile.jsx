import React, { Component } from "react";
import moment from "moment";
import "./styles/scss/Profile.css";

class Profile extends Component {

  componentDidMount() {
    if(!this.props.posts.length) {
      this.props.createPostList();
    }
  }

	render() {
		let userPosts = null;
    let claimedPosts = null;
		if (this.props.posts.length) {
			userPosts = this.props.posts.map(post => {
        if (post.user_id == this.props.currentUser.id) {
				return (
					<div className="column is-one-fourth is-mobile">
						<div className="card">
							<div className="card-image">
								<figure className="image">
									<img src={post.image_url} style={{ maxWidth: "100%" }} />
								</figure>
							</div>
							<div className="card-content">
								<div className="media">
									<div className="media-content">
										<p className="title is-4">{post.title}</p>
									</div>
								</div>
								<div className="content">
									{post.content}
									<br />
									<br />
                  <i className="fas fa-map-pin"></i> {post.address}
                  <br />
                  <br />
                  <small>(Posted {moment(post.created_at).fromNow()})</small>
								</div>
							</div>
							<footer className="card-footer">
								<a href="#" className="card-footer-item">
									Delete
								</a>
							</footer>
						</div>
					</div>
				);
        }
			});
		} else if (this.props.posts.length) {
        claimedPosts = this.props.posts.map(post => {
          if (post.claimed_by == this.props.currentUser.id) {
            return (
              <div>{post.title}</div>
            )
          }
        })
      } else {
      return (
        <div className="hero is-centered">
          <div className="hero-content">
            <p>No posts to display 👀</p>
            <br/>
          </div>
        </div>
      )
    }
		return (
			<div className="container">
        <div className="section">
          <div>
            <h1>Your Points</h1>
          </div>
          <div>
            {this.props.currentUser.points}
          </div>
        </div>
        <div className="section">
          <div>
            <h1>Your Claimed Items</h1>
          </div>
          <div className="row columns is-multiline claimed-items">
            {claimedPosts}
          </div>
        </div>
        <hr/>
				<div className="section">
          <div>
            <h1>Your Posts</h1>
          </div>
					<div className="row columns is-multiline user-posts">
            {userPosts.reverse()}
          </div>
				</div>
			</div>
		);
	}
}

export default Profile;

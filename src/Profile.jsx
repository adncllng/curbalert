import React, { Component } from "react";
import moment from "moment";
import "./styles/scss/PostList.css";

class Profile extends Component {
	render() {
		let posts = null;
		if (this.props.posts.length) {
			posts = this.props.posts.map(post => {
				return (
					<div className="column is-one-third">
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
									Claim Item
								</a>
							</footer>
						</div>
					</div>
				);
			});
		} else {
      return (
        <div className="hero is-centered">
          <div className="hero-content">
            <p>No results found 👀</p>
            <br/>
            <button className="button is-outlined" onClick={this.props.resetPosts}>New Search</button>
          </div>
        </div>
      )
    }
		return (
			<div className="container">
				<div className="section">
					<div className="row columns is-multiline">{posts.reverse()}</div>
				</div>
			</div>
		);
	}
}

export default Profile;

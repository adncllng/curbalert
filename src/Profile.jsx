import React, { Component } from "react";
import moment from "moment";
import UserPost from "./UserPost.jsx";
import "./styles/scss/Profile.css";

class Profile extends Component {
	componentDidMount() {
		if (this.props.posts.length === 0) {
			this.props.createPostList();
		}
	}

	getUserClaimedPosts = params => {
		let userClaimedPosts = 0;
		params.map(post => {
			if (post.claimed_by === this.props.currentUser.id) {
				userClaimedPosts += 1
			}
		})
		return userClaimedPosts;
	}

	render() {
		let userPosts;
		let claimedPosts;

		if (this.props.posts.length) {
			userPosts = this.props.posts
				.filter(post => post.user_id === this.props.currentUser.id)
				.map(post => {
					return (
						<UserPost
							id={post.id}
							title={post.title}
							image={post.image_url}
							content={post.content}
							address={post.address}
							created_at={post.created_at}
							deletePost={this.props.deletePost}
						/>
					);
				});
		} else {
			return (
				<div className="hero is-centered">
					<div className="hero-content">
						<p>No posts found yet...</p>
						<br />
					</div>
				</div>
			);
		}

		if (this.props.posts.length) {
			claimedPosts = this.props.posts.map(post => {
				if (post.claimed_by === this.props.currentUser.id) {
					return (
						<div className="column is-one-quarter is-mobile">
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
										<i className="fas fa-map-pin" /> {post.address}
										<br />
										<br />
										<small>(Posted {moment(post.created_at).fromNow()})</small>
									</div>
								</div>
								<footer className="card-footer">
									<a
										onClick={this.props.unclaimItem}
										id={post.id}
										className="button is-small is-outlined is-pulled-right"
										className="card-footer-item">
										Unclaim
									</a>
								</footer>
							</div>
						</div>
					);
				}
			});
		} else {
			return (
				<div className="hero is-centered">
					<div className="hero-content">
						<p>No posts found yet...</p>
						<br />
					</div>
				</div>
			);
		}

		return (
			<div className="container">

				<nav className="level is-mobile">
				  <div className="level-item has-text-centered">
				    <div>
				      <p className="heading">Your Points</p>
				      <p className="title">{this.props.currentUser.points}</p>
				    </div>
				  </div>
				  <div className="level-item has-text-centered">
				    <div>
				      <p className="heading">Claimed Items</p>
				      <p className="title">{this.getUserClaimedPosts(this.props.posts)}</p>
				    </div>
				  </div>
				  <div className="level-item has-text-centered">
				    <div>
				      <p className="heading">Your posts</p>
				      <p className="title">{userPosts.length}</p>
				    </div>
				  </div>
				</nav>

				<div className="section">
					<div className="header">
						<h1>Your Claimed Items</h1>
					</div>
					<hr/>
					<div className="row columns claimed-items is-multiline">
						{claimedPosts}
					</div>
				</div>
				<div className="section">
					<div className="header">
						<h1>Your Posts</h1>
					</div>
					<hr/>
					<div className="row columns user-posts is-multiline">
						{userPosts.reverse()}
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
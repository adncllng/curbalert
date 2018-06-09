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
				<div className="section">
					<div className="is-size-5">
						<h1>Your Points:</h1>
						<h1>{this.props.currentUser.points}</h1>
					</div>
				</div>
				<div className="section">
					<div className="is-size-5">
						<h1>Your Claimed Items</h1>
					</div>
					<div className="row columns is-multiline claimed-items">
						{claimedPosts}
					</div>
				</div>
				<hr />
				<div className="section">
					<div className="is-size-5">
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

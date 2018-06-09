import React, { Component } from "react";
import moment from "moment";
import UserPost from "./UserPost.jsx";
import "./styles/scss/Profile.css";

class Profile extends Component {
	state = { userPosts: [] };
	componentDidMount() {
		if (this.props.posts.length === 0) {
			this.props.createPostList();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ userPosts: nextProps.posts });
	}

	render() {
		let posts;

		if (this.state.userPosts.length !== 0) {
			posts = this.state.userPosts
				.filter(post => post.user_id === this.props.currentUser.id)
				.map(post => {
					return (
						<UserPost
							id={post.id}
							title={post.title}
							image={post.image_url}
							content={post.content}
							address={post.address}
							toggleModal={this.toggleModal}
						/>
					);
				});

			{
				/* } else if (this.props.posts.length) {
			claimedPosts = this.props.posts.map(post => {
				if (post.claimed_by == this.props.currentUser.id) {
					return <div>{post.title}</div>;
				}
			});
		} else {
			return (
				<div className="hero is-centered">
					<div className="hero-content">
						<p>No posts to display 👀</p>
						<br />
					</div>
				</div>
			);
		} */
			}
			return (
				<aside className="container">
					<div className="section">
						<div>
							<h1>Your Points</h1>
						</div>
						<div>{this.props.currentUser.points}</div>
					</div>
					<div className="section">
						<div>
							<h1>Your Claimed Items</h1>
						</div>
						<div className="row columns is-multiline claimed-items">
							{/* {claimedPosts} */}
						</div>
					</div>
					<hr />
					<div className="section">
						<div>
							<h1>Your Posts</h1>
						</div>
						<div className="row columns is-multiline user-posts" />
					</div>
					{posts.reverse()}
				</aside>
			);
		} else {
			return (
				<div className="hero is-centered">
					<div className="hero-content">
						<p>No posts to display 👀</p>
						<br />
					</div>
				</div>
			);
		}
	}
}

export default Profile;

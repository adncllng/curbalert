import React, { Component } from "react";
import moment from "moment";
import "./styles/scss/PostList.css";

class PostList extends Component {
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClear = () => {
		this.setState({
			searchTag: ""
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		let foundPosts = this.props.posts.filter(post => {
			return post.tags.indexOf(this.state.searchTag) > -1;
		});
		this.props.filterPosts(foundPosts);
	};

	componentDidMount() {
		if (!this.props.posts.length) {
			this.props.createPostList();
		}
	}

	render() {
		const searchForm = this.refs.searchForm;
		let posts = null;
		if (this.props.posts.length) {
			posts = this.props.posts.filter(post => post.visible).map(post => {
				if (post.user_id === this.props.currentUser.id) {
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
										<i className="fas fa-map-pin" /> {post.address}
										<br />
										<br />
										<small>(Posted {moment(post.created_at).fromNow()})</small>
									</div>
								</div>
								<footer className="card-footer">
									<a
										onClick={() => {this.props.deletePost(post.id)}}
										className="card-footer-item">
										Delete
									</a>
								</footer>
							</div>
						</div>
					);
				} else {
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
										<i className="fas fa-map-pin" /> {post.address}
										<br />
										<br />
										<small>(Posted {moment(post.created_at).fromNow()})</small>
									</div>
								</div>
								<footer className="card-footer">
									<a
										onClick={this.props.claimItem}
										id={post.id}
										className="card-footer-item">
										Claim
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
						<p>No results found 👀</p>
						<br />
						<button
							className="button is-outlined"
							onClick={this.props.resetPosts}>
							New Search
						</button>
					</div>
				</div>
			);
		}
		return (
			<div className="container">
				<div className="box">
					<section className="modal-card-body">
						<form onSubmit={this.handleFormSubmit} ref="searchForm">
							<div className="field is-three-quarters is-grouped">
								<p className="control has-icons-left is-expanded">
									<input
										className="input"
										type="search"
										placeholder="Search"
										name="searchTag"
										onChange={this.handleChange}
									/>
									<span className="icon is-small is-left">
										<i className="fa fa-search" />
									</span>
								</p>
							</div>
							<button className="button is-warning">Submit</button>
						</form>
					</section>
					<button
						className="button is-outlined search"
						onClick={event => {
							this.props.resetPosts();
							this.props.clearSearchForm(searchForm);
							this.handleClear();
						}}>
						New Search
					</button>
				</div>
				<div className="section">
					<div className="row columns is-multiline">{posts.reverse()}</div>
				</div>
			</div>
		);
	}
}

export default PostList;

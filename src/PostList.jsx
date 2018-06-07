import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import moment from "moment";
import "./styles/scss/PostList.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      posts: this.props.posts
    };
  }

  handleChange(e) {
    // need to move this to action.js eventually
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let foundPosts = this.props.posts.filter(post => {
      return post.tags.indexOf(this.state.searchTag) > -1;
    });
    this.props.filterPosts(foundPosts);
  }

	componentDidMount() {
		this.props.createPostList();
	}

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
									<small>Posted {moment(post.created_at).fromNow()}</small>
								</div>
							</div>
							<footer className="card-footer">
								<a href="#" className="card-footer-item">
									Claim Item
								</a>
								<a href="#" className="card-footer-item">
									View Map
								</a>
                <a href="#" className="card-footer-item">
                  <i className="fas fa-heart"></i>
                </a>
							</footer>
						</div>
					</div>
				);
			});
		} else {
      return (
        <div>Loading...</div>
      )
    }
		return (
			<div className="container">
				<form onSubmit={this.handleFormSubmit}>
					<section className="modal-card-body">
						<br />
						<div className="field">
							<p className="control has-icons-left">
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
						<button className="button is-light">Submit</button>
					</section>
				</form>
				<button onClick={this.props.resetPosts}>Clear</button>
				<div className="section">
					<div className="columns is-multiline is-mobile">{posts}</div>
				</div>
			</div>
		);
	}
}

export default PostList;

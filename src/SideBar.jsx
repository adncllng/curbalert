import React, { Component } from "react";
import "./styles/scss/SideBar.css";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			posts: this.props.posts
		};
	}

	handleChange(e) {
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

	clearForm = () => {
	  this.searchForm.reset();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ posts: nextProps.posts });
	}

	render() {
		let posts = null;
		if (this.state.posts.length) {
			posts = this.state.posts.map(post => {
				return (
					<li>
						<a href="#">
							{post.title}
							<img src={post.image_url} style={{ maxWidth: "100%" }} />
						</a>
					</li>
				);
			});

			return (
				<aside className="menu column is-fullheight has-shadow">
					<div className="column">
						<form onSubmit={this.handleFormSubmit} ref={(el) => this.searchForm = el}>
								<br/>
								<div className="field">
									<p className="control has-icons-left">
										<input
											style={{width: '100%'}}
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
								<button style={{width: '100%'}} className="button is-link is-focused">Submit</button>
						</form>
					<br/>
					<button style={{width: '100%'}} className="button is-outlined" onClick={this.props.resetPosts}>New Search</button>
					</div>
					<ul className="menu-list">{posts}</ul>
				</aside>
			);
		} else {
			return (
				<div style={{margin: '30px'}}>
					<p>No results found  ¯\_(ツ)_/¯</p>
					<br/>
					<button style={{width: '100%'}} className="button is-outlined" onClick={this.props.resetPosts}>New Search</button>
				</div>
			)
		}
	}
}

export default SideBar;

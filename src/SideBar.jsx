import React, { Component } from "react";
import "./styles/scss/SideBar.css";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: this.props.posts
		};
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
							<img src={post.image_url} />
						</a>
					</li>
				);
			});
			return (
				<aside className="column is-fullheight">
					<a href="/posts" className="menu-label">
						<span className="allposts">
							<i className="trash-icon fa fa-trash" />
							All Posts
						</span>
					</a>
					<ul className="menu-list">{posts}</ul>
				</aside>
			);
		} else {
			return <div>loading...</div>;
		}
	}
}

export default SideBar;

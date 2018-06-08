import React, { Component } from "react";
import SideBarItem from "./SideBarItem.jsx";
import "./styles/scss/SideBar.css";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: this.props.posts
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleClear = () => {
		this.setState({
			searchTag: ''
		});
	}

	handleFormSubmit = e => {
		e.preventDefault();
		let foundPosts = this.props.posts.filter(post => {
			return post.tags.indexOf(this.state.searchTag) > -1;
		});
		this.props.filterPosts(foundPosts);
	}

	toggleModal = key => {
    let thisPost = null;
      this.state.posts.forEach((post, i) => {
      if (post.id == key) {
       thisPost = post
      }
    })
    this.props.showModal(thisPost)
  }

	componentWillReceiveProps(nextProps) {
		this.setState({ posts: nextProps.posts });
	}

	render() {
		const searchForm = this.refs.searchForm;

		let posts = null;
		if (this.state.posts.length) {
			posts = this.state.posts.map(post => {
				return (
					<SideBarItem
						id={post.id}
						title={post.title}
						image={post.image_url}
						toggleModal={this.toggleModal}
					/>
				);
			});

			return (
				<aside className="menu column is-fullheight has-shadow">
					<div className="column">
						<form onSubmit={this.handleFormSubmit} ref="searchForm">
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
					<button style={{width: '100%'}} className="button is-outlined" onClick={(event) => { this.props.resetPosts(); this.props.clearSearchForm(searchForm); this.handleClear();}}>New Search</button>
					</div>
						{posts.reverse()}
				</aside>
			);
		} else {
			return (
				<div style={{margin: '30px'}}>
					<p>No results found 👀</p>
					<br/>
					<button style={{width: '100%'}} className="button is-outlined" onClick={this.props.resetPosts}>New Search</button>
				</div>
			)
		}
	}
}

export default SideBar;

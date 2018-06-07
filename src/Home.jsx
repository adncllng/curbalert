import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SideBar from "./SideBar.jsx";
import "./styles/scss/Home.css";
import "./styles/scss/NavBar.css";

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="homepage">
				<section className="sidebar columns is-fullheight">
					<SideBar
						posts={this.props.posts}
						createPostList={this.props.createPostList}
						filterPosts={this.props.filterPosts}
            resetPosts={this.props.resetPosts}
						clearSearchForm={this.props.clearSearchForm}
					/>
				</section>
			</div>
		);
	}
}

export default Home;

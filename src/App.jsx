import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';
import './styles/scss/App.css';
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import PostList from "./PostList.jsx"

import NewPost from "./NewPost.jsx"
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer.jsx'
require('dotenv').config()


class App extends Component {

	state = {
		posts: []
	}

createPostList = () => {
	let postsArr = [];
    axios.get('http://localhost:3001/api/posts')
    .then(response => {
			postsArr = response.data;
			postsArr.forEach(post => {
			this.setState(prevState => ({
					posts: [...prevState.posts, post]
				}));
			});
    })
    .catch(error => {
      console.log(error);
    });
	}


	render() {
		return (
			<div className="App">
				<NavBar />
				<Switch>
					<Route exact path='/upload' render={() => (
						<NewPost trashUploadHandler={this.trashUploadHandler} addPost={this.addPost} />
					)}/>
					<Route exact path="/" component={Home} />
					<Route exact path="/posts" render={() => (
						<PostList posts={this.state.posts} createPostList={this.createPostList} />
					)}/>
				</Switch>
			</div>
		);
	}
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';
import './styles/scss/App.css';
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import PostList from "./PostList.jsx"

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
					<Route exact path="/" component={Home} />
          <Route exact path='/login' component={ LoginForm }/>
          <Route exact path='/register' component={ RegisterForm }/>
					<Route exact path="/posts" render={() => (
						<PostList posts={this.state.posts} createPostList={this.createPostList} />
					)}/>
				</Switch>
			</div>
		);
	}
}

export default App;

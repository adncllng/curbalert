import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './styles/scss/App.css';
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import NewPost from "./NewPost.jsx"

class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path='/upload' render={() => (
						<NewPost trashUploadHandler={this.trashUploadHandler} addPost={this.addPost} />
					)}/>
					{/* both /roster and /roster/:number begin with /roster */}
				</Switch>
			</div>
		);
	}
}

export default App;

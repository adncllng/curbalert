import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './styles/scss/App.css';
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";

class App extends Component {

	this.state = {




	}


	render() {
		return (
			<div className="App">
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					{/* both /roster and /roster/:number begin with /roster */}
				</Switch>
			</div>
		);
	}
}



export default App;

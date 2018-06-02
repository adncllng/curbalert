import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={ Home }/>
          {/* both /roster and /roster/:number begin with /roster */}
        </Switch>
      </div>
    );
  }
}

export default App;
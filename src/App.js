import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './home.jsx';

class App extends Component {
  render() {
    return (
<div>
<Switch>
  <Route exact path='/' component={Home}/>
  {/* both /roster and /roster/:number begin with /roster */}
</Switch>
</div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './home.jsx';
import Upload from './upload.jsx';

class App extends Component {
  state = {
    trashFile: "",
    posts: null
  }

  trashUploadHandler = event => {
    console.log("somehing happens")
    this.setState({
      trashFile: event.target.files[0]
    })
  }

   addPost = post => {
     console.log("somehing happens")
     const updatedPosts = this.state.posts.concat(post)
     this.setState({
       posts: updatedPosts
     })
   }

  render() {
    return (
<div>
<Switch>
  <Route path='/' render={() => (
    <Upload trashUploadHandler={this.trashUploadHandler} addPost={this.addPost} />
  )}/>
  {/* both /roster and /roster/:number begin with /roster */}
</Switch>
</div>
    );
  }
}

export default App;

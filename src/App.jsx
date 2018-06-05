import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Geocode from 'react-geocode';
import './styles/scss/App.css';
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import PostList from "./PostList.jsx"
import NewPost from "./NewPost.jsx"
import MapContainer from './MapContainer.jsx'
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
require('dotenv').config()

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

class App extends Component {

  constructor(props) {
    super(props);
  	this.state = {
  		posts: [],
      center: {lat: 0, lng: 0},
      zoom: 11
      };
  	}

  componentDidMount() {
    Geocode.fromAddress("1275 Avenue des Canadiens-de-Montreal").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ center: { lat: lat, lng: lng} })
      },
      error => {
        console.error(error);
      }
    );
  }

  createPostList = () => {
    let that = this;
    let postsArr = [];
    axios.get('http://localhost:3001/api/posts')
    .then(response => {
      postsArr = response.data;
      this.setState({ posts: [...that.state.posts, ...postsArr] })
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
          <Route exact path='/login' component={ LoginForm }/>
          <Route exact path='/register' component={ RegisterForm }/>

					<Route exact path='/upload' render={() => (
						<NewPost trashUploadHandler={this.trashUploadHandler} addPost={this.addPost} />
					)}/>

					<Route exact path="/" render={() => (
            <div>
              <Home />
  						 <div style={{width: '100%', height: '600px'}}>
                <MapContainer center={this.state.center} zoom={this.state.zoom} posts={this.state.posts} createPostList={this.createPostList} />
              </div>
            </div>
          )}/>

          <Route exact path="/posts" render={() => (
            <PostList posts={this.state.posts} createPostList={this.createPostList} />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App

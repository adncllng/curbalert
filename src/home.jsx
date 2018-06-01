import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {

componentDidMount(){
  axios.get('http://localhost:3001/')
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}
  render() {
    return (
<div>hello WOrld</div>
    );
  }
}
 export default Home;

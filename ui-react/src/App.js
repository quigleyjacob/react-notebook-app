import React, { Component } from 'react';
import './App.css';
import Notebook from './Notebook'
import Text from './Text';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReturning: true,
      isLoggedIn: false,
      idOfOpen: ''
    }

    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoggedIn: this.cookieToJSON(document.cookie).id ? true : false
    })
  }
  //https://stackoverflow.com/questions/5047346/converting-strings-like-document-cookie-to-objects
 cookieToJSON(str) {
  	str = str.split('; ');
  	var result = {};
  	for(var i = 0; i < str.length; i++) {
  		var cur = str[i].split('=');
  		result[cur[0]] = cur[1];
  	}
  	return result;
  }

  getOpen(id) { //returns the id of the currently opened notebook
    this.setState({
      idOfOpen: id
    })
  }
  toggleLoginRegister() {
    this.setState({
      isReturning: !this.state.isReturning
    })
  }
  toggleLogin() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  isNew() {
    return (
      <div className="App">
        <Register toggle={this.toggleLoginRegister}/>
      </div>
    );
  }
  isReturning() {
    return (
      <div className="App">
        <Login toggle={this.toggleLoginRegister} login={this.toggleLogin}/>
      </div>
    );
  }
  loggedIn() {
    return (
      <div className="App">
        <Notebook onOpen={this.getOpen.bind(this)} cookie={this.cookieToJSON}/>
        <Text id={this.state.idOfOpen}/>
      </div>
    );
  }

  render() {
    const showApp = this.state.isLoggedIn ? this.loggedIn() : (this.state.isReturning ? this.isReturning() : this.isNew());
    return (
      <div>
        <Nav isLoggedIn={this.state.isLoggedIn}/>
        {showApp}
      </div>
    );
  }
}

export default App;

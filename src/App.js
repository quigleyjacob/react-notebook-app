import React, { Component } from 'react';
import './App.css';
import Notebook from './Notebook'
import Nav from './Nav';
import Login from './Login';
import Register from './Register';
import Quill from './Quill';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReturning: true,
      isLoggedIn: false,
      nameOfOpen: '',
      idOfOpenNote: ''
    }

    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.registerPage = this.registerPage.bind(this);
    this.logout = this.logout.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.fetchUsername = this.fetchUsername.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoggedIn: this.cookieToJSON(document.cookie).id ? true : false
    }, () => {
      if(this.state.isLoggedIn) {
        this.fetchUsername();
      }
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

  getNoteOpen(id) {//returns is of opened note
    this.setState({
      idOfOpenNote: id
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
        <Login toggle={this.toggleLoginRegister} login={this.toggleLogin} name={this.getUsername}/>
      </div>
    );
  }
  loggedIn() {
    return (
      <div className="App ui celled grid">
        <div className="four wide column">
        <Notebook onNoteOpen={this.getNoteOpen.bind(this)} cookie={this.cookieToJSON}/>
        </div>
        <div className="twelve wide column document">
          <Quill noteId={this.state.idOfOpenNote}/>
        </div>
      </div>
    );
  }
  loginPage() {
    this.setState({
      isLoggedIn: false,
      isReturning: true
    })
  }
  registerPage() {
    this.setState({
      isLoggedIn: false,
      isReturning: false
    })
  }
  logout() {
    document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({
      isLoggedIn: false,
      isReturning: true
    })
  }
  getUsername(name) { // used when logging in a user
    this.setState({
      nameOfOpen: name
    })
  }
  fetchUsername() { //used when a user is already logged in when opening the page
    fetch('/api/users/' + this.cookieToJSON(document.cookie).id)
    .then(resp => resp.json())
    .then(found => {
      if(found !== null) {
        this.setState({nameOfOpen: found.firstName})
      }
    })
  }

  render() {
    const showApp = this.state.isLoggedIn ? this.loggedIn() : (this.state.isReturning ? this.isReturning() : this.isNew());
    return (
      <div>
        <Nav
        isLoggedIn={this.state.isLoggedIn}
        login={this.loginPage}
        register={this.registerPage}
        logout={this.logout}
        showUser={this.state.nameOfOpen}
        />
        {showApp}
      </div>
    );
  }
}

export default App;

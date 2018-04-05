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
        <Login toggle={this.toggleLoginRegister}/>
      </div>
    );
  }
  loggedIn() {
    return (
      <div className="App">
        <Notebook onOpen={this.getOpen.bind(this)}/>
        <Text id={this.state.idOfOpen}/>
      </div>
    );
  }
  loginUser() {

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

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
  }

  getOpen(id) {
    this.setState({
      idOfOpen: id
    })
  }

  isNew() {
    return (
      <div className="App">
        <Register />
      </div>
    );
  }
  isReturning() {
    return (
      <div className="App">
        <Login />
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

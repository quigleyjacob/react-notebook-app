import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notebook from './Notebook'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    return (
      <div className="App">
        <Notebook />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Notebook from './Notebook'
import Text from './Text';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      idOfOpen: ''
    }
  }

  getOpen(id) {
    this.setState({
      idOfOpen: id
    })
  }

  render() {
    return (
      <div className="App">

        <Notebook onOpen={this.getOpen.bind(this)}/>
        <Text id={this.state.idOfOpen}/>
      </div>
    );
  }
}

export default App;

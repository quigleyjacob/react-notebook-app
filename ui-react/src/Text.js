import React, {Component} from 'react';
import './App.css';
import Toolbar from './Toolbar';

const url = '/api/notebooks/';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: ''
    }

    this.getNotebookById = this.getNotebookById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getNotebookById(nextProps.id);
  }

  handleChange(e) {
    this.setState({text: e.target.value}, () => {
      this.updateText(this.props.id);
    });
  }

  updateText(id) {
    fetch(url + id, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({body: this.state.text})
    })
    .then(resp => {
      if(!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: "Please try again later"};
          throw err;
        }
      }
      return resp.json();
    })
  }

  getNotebookById(id) {
    fetch(url + id)
    .then(resp => {
      if(!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: "Please try again later"};
          throw err;
        }
      }
      return resp.json();
    })
    .then(found => (
      this.setState({text: found.body, name: found.name})
    ))
  }

  render() {
    return (
      <div>

        <div className="ui huge header centered aligned title">
          {this.state.name}
        </div>
        <Toolbar />
        <textarea
        ref='doc'
        onChange={this.handleChange}
        value={this.state.text}
        className="fileText"
        />
      </div>
    )
  }
}

export default Text;

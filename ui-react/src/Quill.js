import React, {Component} from 'react';
import ReactQuill from 'react-quill';

const noteURL = '/api/notes/';

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = { text: ''}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value }, () => {
      this.updateText(this.props.noteId);
    })
  }

  componentWillReceiveProps(nextProps) {
    this.getNoteById(nextProps.noteId);
  }

  getNoteById(id) {
    fetch(noteURL + id)
    .then(resp => resp.json())
    .then(found => {
      if(found !== null) {
        this.setState({text: found.body})
      }
    })
  }

  updateText(id) {
    fetch(noteURL + id, {
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

  render() {
    return (
      <div>
        <ReactQuill
        value={this.state.text}
        onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Quill;

import React, {Component} from 'react';
import ReactQuill from 'react-quill';
// I spent a lot of time trying to create my own rich text editor, but
// I figured out that making such a thing was going to much a lot of
// work, so I am using a package called Quill.js to handle that

const noteURL = '/api/notes/';

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = { text: ''}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) { //sets state when anything is changed in a note
    this.setState({ text: value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.noteId.length > 0) {
      this.getNoteById(nextProps.noteId);
    }
    this.updateText(this.props.noteId); //update to database your old file when a new one is opened up
  }

  getNoteById(id) { //called when a link to open a ntoe is clicked
    fetch(noteURL + id)
    .then(resp => resp.json())
    .then(found => {
      if(found !== null) {
        this.setState({text: found.body})
      }
    })
  }

  updateText(id) { //updates the databse with the current value of the textarea
    if(this.props.noteId) {
      fetch(noteURL + id, {
        method: "put",
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({body: this.state.text, userId: this.props.cookie(document.cookie).id})
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

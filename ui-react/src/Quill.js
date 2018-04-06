import React, {Component} from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const url = '/api/notebooks/';

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '', name: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value }, () => {
      this.updateText(this.props.id);
    })
  }

  componentWillReceiveProps(nextProps) {
    this.getNotebookById(nextProps.id);
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
    .then(found => {
      // console.log(found)
      if(found !== null) {
        this.setState({text: found.body, name: found.name})
      }
    })
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

  render() {
    return (
      <div>
        <div className="ui huge header centered aligned title">
          {this.state.name}
        </div>
        <ReactQuill
        value={this.state.text}
        onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Quill;

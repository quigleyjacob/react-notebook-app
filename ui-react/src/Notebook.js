import React, {Component} from 'react';
import NotebookForm from './NotebookForm';
import NotebookItem from './NotebookItem';

const url = '/api/notebooks'

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    }

    this.addNotebook = this.addNotebook.bind(this);
  }

  componentWillMount() {
    fetch(url)
    .then((resp) => resp.json())
    .then(notebooks => this.setState({notebooks: notebooks}));
  }

  addNotebook(val) {
    fetch(url, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val})
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
    .then(newNotebook => this.setState({notebooks: [...this.state.notebooks, newNotebook]}));
  }

  render() {
    const notebooks = this.state.notebooks.map(n => (
      <NotebookItem key={n._id} name={n.name} />
    ))
    return (
      <div>
        <div> This is the Notebook</div>
        <NotebookForm addNotebook={this.addNotebook}/>
        <ul>
        {notebooks}
        </ul>
      </div>
    );
  }
}

export default Notebook;

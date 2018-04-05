import React, {Component} from 'react';
import NotebookForm from './NotebookForm';
import NotebookItem from './NotebookItem';

const url = '/api/notebooks/'

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: []
    }

    this.addNotebook = this.addNotebook.bind(this);
  }

  componentWillMount() {
    fetch(url+"?q="+this.props.cookie(document.cookie).id)
    .then((resp) => resp.json())
    .then(notebooks => this.setState({notebooks: notebooks}));
  }

  addNotebook(val) {
    fetch(url, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val, userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(newNotebook => this.setState({notebooks: [...this.state.notebooks, newNotebook]}));
  }

  deleteNotebook(id) {
    const notebooks = this.state.notebooks.filter(notebook => notebook._id !== id);
    fetch(url + id, {method: "delete"})
    .then(resp => resp.json())
    .then(this.setState({notebooks: notebooks}))
  }

  getId(id) {
    this.props.onOpen(id);
  }

  render() {
    const notebooks = this.state.notebooks.map(n => (
      <NotebookItem
      key={n._id}
      name={n.name}
      onDelete={this.deleteNotebook.bind(this, n._id)}
      onClick={this.getId.bind(this, n._id)}
      />
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

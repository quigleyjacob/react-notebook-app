import React, {Component} from 'react';

class NotebookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNotebook(this.state.inputValue);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
        type='text'
        value={this.state.inputValue}
        onChange={this.handleChange}
        />
        <button>Add New Notebook</button>
      </form>
    )
  }
}

export default NotebookForm;

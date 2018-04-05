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
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <input
          type='text'
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Add new notebook"
          />
        </div>

        <button className="ui button tiny fluid">Add New Notebook</button>
      </form>
    )
  }
}

export default NotebookForm;

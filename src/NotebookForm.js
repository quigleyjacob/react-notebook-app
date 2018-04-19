import React, {Component} from 'react';
import {Form} from "semantic-ui-react";

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
    this.setState({ //resets form
      inputValue: ''
    })
  }

  render() {
    return (
      <Form id="notebook_form" className="ui form" onSubmit={this.handleSubmit}>
      <Form.Field>
      <input
        type='text'
        value={this.state.inputValue}
        onChange={this.handleChange}
        placeholder="Add new notebook"
        maxLength="20"
        />
      </Form.Field>
      </Form>

    )
  }
}

export default NotebookForm;

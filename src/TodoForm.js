import React, {Component} from 'react';
import { Form } from 'semantic-ui-react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state= {value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.value);
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <Form id="todo-form" size='mini' onSubmit={this.handleSubmit}>
        <Form.Field>
          <input
          value={this.state.value}
          placeholder="Enter task here"
          onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default TodoForm;

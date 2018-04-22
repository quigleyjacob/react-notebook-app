import React, {Component} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const URL = '/api/todos/'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  componentWillMount() {
    this.getTodos();
  }

  getTodos() {
    fetch(URL+"?q="+this.props.cookie(document.cookie).id)
    .then((resp) => resp.json())
    .then(todos => this.setState({todos: todos}));
  }

  render() {
    return (
      <div className="gadget">
        <div class="ui header center aligned">
          Things to do
        </div>
        <TodoForm/>
        <TodoList items={this.state.todos}/>
      </div>
    )
  }
}

export default Todo;

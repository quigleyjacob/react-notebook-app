import React, {Component} from 'react';
import TodoForm from './TodoForm';
// import TodoList from './TodoList';

const URL = '/api/todos/'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    }

    this.addTodo = this.addTodo.bind(this);
  }

  componentWillMount() {
    this.getTodos();
  }

  getTodos() {
    fetch(URL+"?q="+this.props.cookie(document.cookie).id)
    .then((resp) => resp.json())
    .then(todos => this.setState({todos: todos}));
  }

  addTodo(val) { //val is the name of the new notebook
    fetch(URL, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val, authorId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(newTodo => this.setState({todos: [...this.state.todos, newTodo]}));
  }

  deleteTodo(id) {
    const todos = this.state.todos.filter(todo => todo._id !== id);
    fetch(URL + id, {method: "delete"})
    .then(resp => resp.json())
    .then(this.setState({todos: todos}))
  }

  render() {
    const items = this.state.todos.map(item => (
      <li key={item._id}>
      <span>{item.name}</span>
      <i onClick={this.deleteTodo.bind(this, item._id)} className="remove icon"></i>
      </li>
    ));
    return (
      <div className="gadget">
        <div className="ui header center aligned">
          Things to do
        </div>
        <TodoForm addTodo={this.addTodo}/>
        <ul>
        {items}
        </ul>
      </div>
    )
  }
}

export default Todo;

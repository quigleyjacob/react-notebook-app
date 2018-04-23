import React, {Component} from 'react';
import TodoForm from './TodoForm';

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

  deleteTodo(id) { //deletes a todo permanently when the x is clicked
    const todos = this.state.todos.filter(todo => todo._id !== id);
    fetch(URL + id, {
      method: "delete",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(this.setState({todos: todos}))
  }

  toggleTodo(item) { //puts a srike through the text of a todo when the text is clicked
    fetch(URL + item._id, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({completed: !item.completed, userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    const todos = this.state.todos.map(t =>
      (t._id === item._id) ? {...t, completed: !t.completed} : t
    );
    this.setState({todos: todos})
  }

  render() {
    const items = this.state.todos.map(item => (
      <li key={item._id}>
      <span
      style={{
        textDecoration: item.completed ? 'line-through' : 'none'
      }}
      onClick={this.toggleTodo.bind(this, item)}>{item.name}</span>
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

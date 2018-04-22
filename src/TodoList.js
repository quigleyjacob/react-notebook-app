import React, {Component} from 'react';

class TodoList extends Component {
  render() {
    console.log(this.props.items);
    // const todos = this.props.items.map(item => (
    //     <li key={item}>{item}</li>
    // ));

    return (
      <div>
        Todo list
        <ul>
        <li>here</li>

        </ul>
      </div>
    )
  }
}

export default TodoList;

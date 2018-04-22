import React, {Component} from 'react';
import Todo from './Todo';

class Gadgets extends Component {
  render() {
    return (
      <div>
        <Todo cookie={this.props.cookie}/>
      </div>
    )
  }
}

export default Gadgets;

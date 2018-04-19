import React from 'react';
import './App.css';

// this component is the individual notebooks on the accordain
// using a component to gain practice using a stateless component

const NotebookItem = ({name, onDelete, onClick, onEdit}) => (
  <span
  onClick={onClick}
  className="title">
    {name}
    <i onClick={onDelete} className="remove icon"></i>
    <i onClick={onEdit} className="pencil icon"></i>
  </span>
)

export default NotebookItem;

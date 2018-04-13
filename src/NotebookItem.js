import React from 'react';
import './App.css'

const NotebookItem = ({name, onDelete, onClick}) => (
  <span
  onClick={onClick}
  className="title">
    {name}
    <i onClick={onDelete} className="remove icon"></i>
    <i className="pencil icon"></i>
  </span>
)

export default NotebookItem;

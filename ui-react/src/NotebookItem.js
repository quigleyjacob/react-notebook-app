import React from 'react';
import './App.css'

const NotebookItem = ({name, onDelete, onClick}) => (
  <div
  onClick={onClick}
  className="notebook">
    {name}
    <span className="delete" onClick={onDelete}> <span className="ui mini inverted red button">X</span> </span>
  </div>
)

export default NotebookItem;

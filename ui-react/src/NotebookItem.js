import React from 'react';

const NotebookItem = ({name, onDelete, onClick}) => (
  <li>
    <span onClick={onClick}>
    {name}
    </span>
    <span onClick={onDelete}> X </span>
  </li>
)

export default NotebookItem;

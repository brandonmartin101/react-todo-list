import React from 'react';

const ToDoListTag = (props) => {
  return (
    <span className="to-do-list-tag" onClick={() => props.changeActiveList(props.listName)}>
      {props.listName}
    </span>
  );
};

export default ToDoListTag;
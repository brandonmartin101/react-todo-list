import React from 'react';
import ToDoListItem from './to-do-list-item';

const ToDoList = (props) => {
  const toDoItems = props.toDos.map((toDo) => {
    return (
      <ToDoListItem
        toDo={toDo[0]}
        toDoId={toDo[1]}
        key={toDo[1]}
        toDoState={toDo[2]}
        onToDoComplete={props.onToDoComplete}
        onToDoDelete={props.onToDoDelete}
        onToDoChange={props.onToDoChange} />
    )
  });
  return (
    <div className={"show-"+props.filter}>
      {toDoItems}
    </div>
  );
};

export default ToDoList;
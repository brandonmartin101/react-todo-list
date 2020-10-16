import React from 'react';
import ToDoListSelectorTag from './to-do-list-selector-tag';

const ToDoListSelector = (props) => {
  const toDoLists = props.allLists.map((list) => {
    return (
      <ToDoListSelectorTag
        key={list}
        listName={list}
        changeActiveList={props.changeActiveList} />
    )
  });
  return (
    <div className="to-do-list-switcher">
      List: {toDoLists}
    </div>
  );
};

export default ToDoListSelector;
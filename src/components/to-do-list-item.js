import React from 'react';
import { Icon } from 'antd';

const ToDoListItem = (props) => {
  const showInput = function() {
    document.querySelector("#"+props.toDoId+" .hide-input").className = "to-do-list-item-input show-input";
    document.querySelector("#"+props.toDoId+" .to-do-list-item-input").value = props.toDo
    document.querySelector("#"+props.toDoId+" .to-do-list-item-input").focus();
    document.querySelector("#"+props.toDoId+" .to-do-list-item-input").readOnly = false;
  }
  const hideInput = function() {
    var target = document.querySelector("#"+props.toDoId+" .show-input");
    if (target) document.querySelector("#"+props.toDoId+" .show-input").className = "to-do-list-item-input hide-input";
    document.querySelector("#"+props.toDoId+" .to-do-list-item-edit").className = "to-do-list-item-edit";
    document.querySelector("#"+props.toDoId+" .to-do-list-item-input").readOnly = true;
  }
  const toggleInput = function() {
    showInput();
    document.querySelector("#"+props.toDoId+" .to-do-list-item-edit").className = "to-do-list-item-edit hide-edit";
  }
  var enterInput = function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) hideInput();
  }
  return (
    <div className={"to-do-list-item to-do-list-item-"+props.toDoState} id={props.toDoId}>
      <span className="to-do-list-item-mark" onClick={() => props.onToDoComplete(props.toDoId)}>
        <span className="icon">&#10003;</span>
      </span>
      <span className="to-do-list-item-text" onDoubleClick={showInput}>
        {props.toDo}
        <input
          className="to-do-list-item-input hide-input"
          type="text"
          placeholder={props.toDo}
          onBlur={hideInput}
          onChange={e => props.onToDoChange(e.target.value,props.toDoId)}
          onKeyPress={e => enterInput(e)}
          readOnly="true" />
      </span>
      <span className="to-do-list-item-del" onClick={() => props.onToDoDelete(props.toDoId)}>
        <Icon type="close-circle" />
      </span>
      <span className="to-do-list-item-edit" onClick={toggleInput}>
        <Icon type="edit" />
      </span>
    </div>
  );
};

export default ToDoListItem;
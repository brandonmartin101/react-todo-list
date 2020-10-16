import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class ToDoInput extends Component {
  constructor(props) {
    super(props);
    this.state = { toDo: '' };
  }
  render() {
    return (
      <Form layout="inline" onSubmit={e => this.onInputSubmit(e)}>
        <Input className="to-do-input" placeholder="Type new to-do-item here"
          onChange={e => this.setState({ toDo: e.target.value})} />
        <Button type="primary" htmlType="submit" icon="plus"></Button>
      </Form>
    );
  }
  onInputSubmit(e) {
    e.preventDefault();
    if (document.querySelector(".to-do-input").value) this.props.onToDoCreation(this.state.toDo);
    document.querySelector(".to-do-input").value = "";
  }
}

export default ToDoInput;
import React, { Component } from 'react';
import _ from 'lodash';
import cookie from 'react-cookie';
import { Row, Col, Button, Icon } from 'antd';
const ButtonGroup = Button.Group;
import axios from 'axios';
import 'antd/dist/antd.css';
import './App.css';

import ToDoInput from './components/to-do-input';
import ToDoList from './components/to-do-list';
import ToDoListSelector from './components/to-do-list-selector';

// App structure
//  --App
//    --ToDoListSelector
//    --ToDoInput
//    --ToDoList
//      --ToDoListItem

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: (cookie.load('rct-tdl')) ? cookie.load('rct-tdl') : [],
      filter: "all",
      activeList: "General",
      allLists: function (toDos) {
        var lists = [];
        for (var i = 0; i < toDos.length; i++) {
          if (lists.indexOf(toDos[i][3]) === -1) lists.push(toDos[i][3]);
        }
        return lists;
      },
      activeCount: function (toDos) {
        var count = 0;
        for (var i = 0; i < toDos.length; i++) {
          if (toDos[i][2] === "active") count++;
        }
        return count;
      },
      compCount: function (toDos) {
        for (var i = 0; i < toDos.length; i++) {
          if (toDos[i][2] === "completed") return "show";
        }
        return "hide";
      }
    }
    this.createToDo = this.createToDo.bind(this);
    this.checkAllToDos = this.checkAllToDos.bind(this);
    this.completeToDo = this.completeToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.changeToDo = this.changeToDo.bind(this);
    this.clearToDos = this.clearToDos.bind(this);
    this.editAllToDos = this.editAllToDos.bind(this);
    this.saveAllToDos = this.saveAllToDos.bind(this);
    this.changeActiveList = this.changeActiveList.bind(this);
    this.updateToDos = (newToDos) => {
      this.setState({ toDos: newToDos });
      cookie.save('rct-tdl', newToDos);
    }
  }
  componentDidMount() {
    var apiKey = "5fbb9993691d0a992250b10f2820aa35a9fda1e382097dd875037b8442392107";
    axios.get('https://api.unsplash.com/photos/random?count=1&w=1920&h=1080&client_id=' + apiKey)
      .then(function (response) {
        var bgSrc = response.data[0].urls.custom;
        document.getElementById('App').style = 'background: #888 url(' + bgSrc + ') center center / cover no-repeat';
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  createToDo(toDo) {
    var newToDos = this.state.toDos.slice();
    var uniqueId = "t-" + _.random(1, 10000);
    // small chance of duplicate id's here; address this later
    newToDos.push([toDo, uniqueId, "active"]);
    this.updateToDos(newToDos);
  }
  checkAllToDos() {
    var newToDos = this.state.toDos.slice();
    var filter = "active";
    for (var i = 0; i < newToDos.length; i++) {
      if (newToDos[i][2] === "active") filter = "completed";
    }
    newToDos.map(function (x) {
      x[2] = filter;
      return x;
    })
    this.updateToDos(newToDos);
  }
  completeToDo(toDo) {
    var newToDos = this.state.toDos.slice();
    for (var i = 0; i < newToDos.length; i++) {
      if (newToDos[i][1] === toDo) {
        (newToDos[i][2] === "active") ? newToDos[i][2] = "completed" : newToDos[i][2] = "active";
        break;
      }
    }
    this.updateToDos(newToDos);
  }
  deleteToDo(toDo) {
    var newToDos = this.state.toDos.slice();
    for (var i = 0; i < newToDos.length; i++) {
      if (newToDos[i][1] === toDo) {
        newToDos.splice(i, 1);
        break;
      }
    }
    this.updateToDos(newToDos);
  }
  changeToDo(toDo, toDoId) {
    var newToDos = this.state.toDos.slice();
    for (var i = 0; i < newToDos.length; i++) {
      if (newToDos[i][1] === toDoId) newToDos[i][0] = toDo;
    }
    this.updateToDos(newToDos);
  }
  clearToDos() {
    var newToDos = this.state.toDos.slice();
    var cutToDos = [];
    for (var i = 0; i < newToDos.length; i++) {
      if (newToDos[i][2] !== "completed") cutToDos.push(newToDos[i]);
    }
    this.updateToDos(cutToDos);
  }
  editAllToDos() {
    for (var i = 0; i < this.state.toDos.length; i++) {
      document.querySelector("#" + this.state.toDos[i][1] + " .to-do-list-item-input").className = "to-do-list-item-input show-input";
      document.querySelector("#" + this.state.toDos[i][1] + " .to-do-list-item-input").value = this.state.toDos[i][0];
      document.querySelector("#" + this.state.toDos[i][1] + " .to-do-list-item-input").readOnly = false;
    }
    document.querySelector("#" + this.state.toDos[0][1] + " .to-do-list-item-input").focus();
  }
  saveAllToDos() {
    for (var i = 0; i < this.state.toDos.length; i++) {
      document.querySelector("#" + this.state.toDos[i][1] + " .to-do-list-item-input").className = "to-do-list-item-input hide-input";
      document.querySelector("#" + this.state.toDos[i][1] + " .to-do-list-item-input").readOnly = true;
      document.querySelector("#" + this.state.toDos[i][1] + " .to-do-list-item-edit").className = "to-do-list-item-edit";
    }
  }
  changeActiveList(newList) {
    // console.log("new list",newList);
  }
  render() {
    return (
      <div className="App" id="App">
        <Row type="flex" justify="center" align="top">
          <Col xs={20} sm={12} md={9} lg={7} xl={6} className="app-col">
            <h2>Simple To-Do List</h2>
            <div className="list-select-col">
              <ToDoListSelector
                activeList={this.state.activeList}
                allLists={this.state.allLists(this.state.toDos)}
                changeActiveList={this.changeActiveList} />
            </div>
            <div className="input-col">
              <Icon type="down-circle-o" className="to-do-check-all" onClick={this.checkAllToDos} />
              <ToDoInput onToDoCreation={this.createToDo} />
            </div>
            <div className="list-col">
              <ToDoList
                toDos={this.state.toDos}
                onToDoComplete={this.completeToDo}
                onToDoDelete={this.deleteToDo}
                onToDoChange={this.changeToDo}
                filter={this.state.filter} />
            </div>
            <div className="filter-col">
              <div className="to-do-filter">
                <div className="to-do-count"><strong>{this.state.activeCount(this.state.toDos)}</strong> items remaining</div>
                <div className="to-do-tasks-all">
                  <Button className="to-do-edit-all" onClick={this.editAllToDos} icon="edit">
                    Edit All
                  </Button>
                  <Button className="to-do-save-all" onClick={this.saveAllToDos} icon="save">
                    Save Edits
                  </Button>
                </div>
                <ButtonGroup className={"to-do-toggles show-" + this.state.filter}>
                  <Button className="show-all-toggle" onClick={() => this.setState({ filter: "all" })}>
                    All
                  </Button>
                  <Button className="show-active-toggle" onClick={() => this.setState({ filter: "active" })}>
                    Active
                  </Button>
                  <Button className="show-completed-toggle" onClick={() => this.setState({ filter: "completed" })}>
                    Completed
                  </Button>
                </ButtonGroup>
                <div className={"to-do-clear " + this.state.compCount(this.state.toDos) + "-clear"} onClick={this.clearToDos}>Clear Completed</div>
              </div>
            </div>
            <div className="debug hidden">{this.state.toDos}<br />{this.state.filter}<br />{cookie.load('rct-tdl')}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

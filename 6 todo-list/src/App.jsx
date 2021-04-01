import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import './app.css'

export default class App extends Component {

    state = {
      todoList:[
        {id:1,name:'吃饭',done:true},
        {id:2,name:'睡觉',done:true},
        {id:3,name:'买东西',done:false},
      ]
    }
    
    // 传递添加todo的回调函数
    addTodo = (todoObj)=>{
      const {todoList} = this.state
      this.setState({
        todoList:[todoObj,...todoList]
      })
    }

     // 删除
    delTodoByID = (id)=>{
      const {todoList} = this.state


      const newList = todoList.filter(val => {
        return val.id !== id
      })
      this.setState({
        todoList:newList
      })
    }
    
    // 更新选中状态
    updateTodo = (todoObj) =>{
      const {todoList} = this.state
      const {id,done} = todoObj

      for (let i = 0; i < todoList.length; i++) {
        const element = todoList[i];

        if(element.id === id){
          element.done = done
          break
        } 
      }
      this.setState({
        todoList
      })
    }
    
    // 删除已完成的todo
    delTodoOfFinish = ()=>{
      const {todoList} = this.state
      const newTodoList = todoList.filter(val => {
        return !val.done
      })

      this.setState({
        todoList:newTodoList
      })
    }
    
    // 全选
    checkAll = (done) => {
      const {todoList} = this.state
      const newList = todoList.map(val => ({...val,done}))
      this.setState({
        todoList:newList
      })
    }

  render() {
    const {todoList} = this.state

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo = {this.addTodo}/>
          <List todoList={todoList} updateTodo={this.updateTodo} delTodoByID={this.delTodoByID}/>
          <Footer delBtnClick={this.delTodoOfFinish} todoList={todoList} checkAll={this.checkAll}/>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {
  // 限制props
  static propTypes = {
    todoList:PropTypes.array.isRequired,
    updateTodo:PropTypes.func.isRequired,
    delTodoByID:PropTypes.func.isRequired,
  }

  render() {
    const {todoList,updateTodo,delTodoByID} = this.props

    return (
    <ul className="todo-main">
      {
        todoList.map(todo => {
          return <Item updateTodo={updateTodo} delTodoByID={delTodoByID} key={todo.id} {...todo}></Item>
        })
      }
    </ul>
    )
  }
}

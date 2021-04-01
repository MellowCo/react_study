import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './index.css'

export default class Footer extends Component {
  static propTypes= {
    delBtnClick:PropTypes.func.isRequired,
    checkAll:PropTypes.func.isRequired,
    todoList:PropTypes.array.isRequired
  }

  render() {
    const {delBtnClick,todoList,checkAll} = this.props
    const total = todoList.length
    const done = todoList.reduce((pre,todo)=>{
      return pre + (todo.done ? 1 : 0)
    },0)

    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={total===done} onChange={({target})=>checkAll(target.checked)}/>
        </label>
        <span> <span>已完成{done}</span> / 全部{total} </span>
        <button onClick={delBtnClick} className="btn btn-danger">清除已完成任务</button>
      </div>
    )
  }
}

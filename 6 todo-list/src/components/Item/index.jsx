/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

  state = {
    mouse:false
  }

  // 监听选择框
  handleChange = (event) => {
    const {id,updateTodo} = this.props
    updateTodo({id,done:event.target.checked})
  }

  // 监听按钮点击
  handleBtnClick = () =>{
    const {id,delTodoByID} = this.props
    delTodoByID(id)
  }

  // 鼠标移入 改变背景色 显示按钮
  handleMouseMove = () => {
    this.setState({
      mouse:true
    })
  }

  handleMouseLeave = () => {
    this.setState({
      mouse:false
    })
  }
  
  render() {
    const {name,done} = this.props
    const {mouse} = this.state
    return (
        <li style={{backgroundColor:mouse ? '#eee' : '#fff'}} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
        <label>
          <input type="checkbox" checked={done} onChange={this.handleChange}/>
          <span>{name}</span>
        </label>
        <button onClick={this.handleBtnClick} className="btn btn-danger" style={{display: mouse ? 'block' : 'none'}}>删除</button>
      </li>
    )
  }
}

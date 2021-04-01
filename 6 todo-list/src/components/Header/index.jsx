/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {nanoid} from 'nanoid'
import './index.css';

export default class Header extends Component {

  // 监听回车
  handleKeyUp= (e) => {
    const {key,target} = e

    if(target.value.trim() === ''){
      alert('不能为空')
      return
    }

    if(key === 'Enter'){
      const {addTodo} =  this.props
      // 通过nanoid 生成随机id
      // 传递给父组件
      addTodo({id:nanoid(),name:target.value,done:true})
      target.value = ''
    }
  }

  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    );
  }
}

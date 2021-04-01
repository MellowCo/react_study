import React, { Component } from 'react'
import { Select } from 'antd';
const { Option } = Select;
import { Button } from 'antd';

import store from '../../store'
import {createDecreaseAction,createIncreaseAction,createAsyncIncreaseAction} from '../../store/count_action'


export default class Count extends Component {
  state = {
    value:1
  }

  componentDidMount(){
    // 在组件被创建时
    // 检测redux中状态的变化，只要变化，就调用render
    store.subscribe(()=>{
      this.setState({})
    })
  }

  handleChange = (value) =>{
    this.setState({
      value
    })
  }
  
  handleInc = () =>{
    // 通过 dispatch 调用reducer
    store.dispatch(createIncreaseAction(this.state.value*1))
  }

  handleAsyncInc = () =>{
    // 通过 dispatch 调用reducer
    store.dispatch(createAsyncIncreaseAction(this.state.value*1))
  }
  
  handleDec = () =>{
    store.dispatch(createDecreaseAction(this.state.value*1))
  }
  

  render() {
    return (
      <div>
        <h1>Num:{store.getState()}</h1>
        <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>

        <Button type="primary" onClick={this.handleInc}>加</Button>
        <Button type="primary" danger onClick={this.handleDec}>减</Button>
        <Button type="primary" onClick={this.handleAsyncInc}>异步加</Button>
      </div>
    )
  }
}

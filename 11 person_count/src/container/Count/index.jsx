import React, { Component } from 'react'
import { Select } from 'antd'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { createAsyncIncreaseAction, createDecreaseAction, createIncreaseAction } from '../../redux/action/count'

const { Option } = Select

class Count extends Component {
  state = {
    value: 1
  }

  handleChange = (value) => {
    this.setState({
      value
    })
  }

  handleInc = () => {
    // 调用props中加法
    this.props.increase(this.state.value * 1)
  }

  handleAsyncInc = () => {
    // 调用props中异步加法
    this.props.increaseAsync(this.state.value * 1)
  }

  handleDec = () => {
    // 调用props中减法
    this.props.decrease(this.state.value * 1)
  }

  render() {
    return (
      <div>
        <h1>Num:{this.props.count}</h1>
        <Select defaultValue='1' style={{ width: 120 }} onChange={this.handleChange}>
          <Option value='1'>1</Option>
          <Option value='2'>2</Option>
          <Option value='3'>3</Option>
        </Select>

        <Button type='primary' onClick={this.handleInc}>
          加
        </Button>
        <Button type='primary' danger onClick={this.handleDec}>
          减
        </Button>
        <Button type='primary' onClick={this.handleAsyncInc}>
          异步加
        </Button>
      </div>
    )
  }
}

// 由于合并了 reducer
// 通过key 获取 reducer 中的数据
export default connect(
  ({ countData }) => ({
    count: countData
  }),
  {
    increase: createIncreaseAction,
    decrease: createDecreaseAction,
    increaseAsync: createAsyncIncreaseAction
  }
)(Count)

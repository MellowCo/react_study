import React, { Component } from 'react'

export default class Demo extends Component {
  state = {
    number: 0
  }

  add = () => {
    // 1 对象
    const { number } = this.state
    const { data } = this.props
    this.setState(
      {
        number: number + data
      },
      () => {
        //! setState的第二个参数:组件更新后的回调
        console.log('更新后的数据', this.state.number)
      }
    )

    // 2 函数（state,props）
    this.setState(
      ({ number }, { data }) => ({ number: number + data }),
      () => {
        //! setState的第二个参数:组件更新后的回调
        console.log('更新后的数据', this.state.number)
      }
    )

    //! setState是异步更新的
    console.log('setState后的数据', this.state.number)
  }

  render() {
    const { number } = this.state

    return (
      <div>
        <h1>Num: {number}</h1>
        <button onClick={this.add}>+1</button>
      </div>
    )
  }
}

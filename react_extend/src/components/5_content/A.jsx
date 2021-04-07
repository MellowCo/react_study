import React, { Component } from 'react'
import B from './B'
import './index.css'
import MyContent from './MyContent'

export default class A extends Component {
  state = {
    name: 'A name',
    age: 20
  }

  change = () => {
    this.setState({
      name: 'A name2',
      age: 202
    })
  }

  render() {
    const { name, age } = this.state

    return (
      <div className='a'>
        <h1>这是A组件</h1>
        <h1>name：{name}</h1>
        <h1>age：{age}</h1>
        <MyContent.Provider value={{ name, age }}>
          <B></B>
        </MyContent.Provider>

        <button onClick={this.change}>change</button>
      </div>
    )
  }
}

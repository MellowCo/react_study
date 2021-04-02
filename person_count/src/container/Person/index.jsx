import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { createAddUserAction } from '../../redux/action/person'
import { nanoid } from 'nanoid'

class Person extends Component {
  state = {
    name: '',
    age: ''
  }

  handleUserName = ({ target: { value: name } }) => {
    this.setState({
      name
    })
  }

  handleAge = ({ target: { value: age } }) => {
    this.setState({
      age
    })
  }

  addUser = () => {
    const { name, age } = this.state
    const { add } = this.props
    add({ id: nanoid(), name, age })
  }

  render() {
    const { persons, count } = this.props

    return (
      <div>
        <Form name='horizontal_login' layout='inline'>
          <Form.Item name='username'>
            <Input placeholder='姓名' onChange={this.handleUserName} />
          </Form.Item>
          <Form.Item name='password'>
            <Input placeholder='年龄' onChange={this.handleAge} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={this.addUser}>
              添加
            </Button>
          </Form.Item>
        </Form>

        <ul>
          {persons.map(({ id, name, age }) => (
            <li key={id}>
              {id}===={name}==={age}
            </li>
          ))}
        </ul>

        <h2>这是count组件的数据：{count}</h2>
      </div>
    )
  }
}

// 由于合并了 reducer
// 通过key 获取 reducer 中的数据
export default connect(
  // 在person组件中 使用count的数据
  ({ personsData, countData }) => ({
    persons: personsData,
    count: countData
  }),
  {
    add: createAddUserAction
  }
)(Person)

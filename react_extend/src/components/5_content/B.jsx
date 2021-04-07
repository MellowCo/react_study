import React, { Component } from 'react'
import C from './C'
import './index.css'

export default class B extends Component {
  render() {
    return (
      <div className='b'>
        <h1>这是B组件</h1>
        <C></C>
      </div>
    )
  }
}

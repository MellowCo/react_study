import './App.css'
import Count from './container/Count'
import React, { Component } from 'react'
import Person from './container/Person'
// import store from './store'

export default class App extends Component {
  render() {
    return (
      // <Count store={store}/>
      // 在index中 统一设置store
      <div>
        <Count />
        <hr />
        <Person />
      </div>
    )
  }
}

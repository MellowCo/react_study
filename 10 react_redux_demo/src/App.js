import './App.css';
import Count from './container/Count'
import React, { Component } from 'react'
import store from './store'

export default class App extends Component {
  render() {
    return (
      <Count store={store}/>
    )
  }
}



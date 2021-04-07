import { NavLink, Route, Redirect } from 'react-router-dom'

// 通过lazy 懒加载组件
// Suspense 懒加载过程中 指定显示的默认组件
import React, { Component, lazy, Suspense } from 'react'

const About = lazy(() => import('./About'))
const Home = lazy(() => import('./Home'))

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: '100px' }}></div>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-2'>
            <div className='list-group'>
              <NavLink className='list-group-item' to='/about'>
                About
              </NavLink>
              <NavLink className='list-group-item' to='/home'>
                Home
              </NavLink>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='panel'>
              <Suspense fallback={<h1>Loading....</h1>}>
                <Route component={About} path='/about'></Route>
                <Route component={Home} path='/home'></Route>
                <Redirect to='/home'></Redirect>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

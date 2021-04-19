import React, { Component } from 'react'
// import Demo from './components/1_setState'
// import Demo from './components/2_lazyLoad'
// import Demo from './components/3_hooks'
// import Demo from './components/5_content/A'
// import Demo from './components/6_useCallback'
import Demo from './components/7_useMemo'

export default class App extends Component {
  render() {
    return (
      <div>
        <Demo data={2} />
      </div>
    )
  }
}

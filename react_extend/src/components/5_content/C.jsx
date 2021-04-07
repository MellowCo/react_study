import React, { Component } from 'react'
import './index.css'
import MyContent from './MyContent'

// export default class C extends Component {
//   static contextType = MyContent

//   render() {
//     const { name, age } = this.context

//     return (
//       <div className='c'>
//         <h1>这是C组件</h1>
//         <h1>
//           A组件的name：{name}，age：{age}
//         </h1>
//       </div>
//     )
//   }
// }

export default function C() {
  return (
    <div className='c'>
      <h1>这是C组件</h1>
      <MyContent.Consumer>
        {({ name, age }) => (
          <h1>
            A组件的name：{name}，age：{age}
          </h1>
        )}
      </MyContent.Consumer>
    </div>
  )
}

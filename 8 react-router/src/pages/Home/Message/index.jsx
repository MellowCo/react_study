import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom'
import Detail from './Detail'

const message = [
  {id:1,title:"标题1"},
  {id:2,title:"标题2"},
  {id:3,title:"标题3"},
]

export default class Message extends Component {

  pushRoute = ({id,title}) =>{
    return () => {
      // search传参
      // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
      console.log(id,title,this.props.history.push);
      //  state 传参
      this.props.history.push('/home/message/detail',{id,title})
    }
  }

  replaceRoute = ({id,title}) =>{
    return () => {
      // search传参
      // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

      //  state 传参
      this.props.history.replace('/home/message/detail',{id,title})
    }
  }

  render() {
    return (
      <div>
        <ul>
          {
            message.map(val => 
              <li key={val.id}>
                {/* params 传参 */}
                {/* <Link  to={`/home/message/detail/${val.id}/${val.title}`}>{val.title}</Link> */}

                {/* search 传参 */}
                {/* <Link  to={`/home/message/detail?id=${val.id}&title=${val.title}`}>{val.title}</Link> */}

                 {/* state 传参 */}
                 <Link  to={{pathname:'/home/message/detail',state:{id:val.id,title:val.title}}}>{val.title}</Link>
                 <button onClick={this.pushRoute(val)}>push</button>
                 <button onClick={this.replaceRoute(val)}>replace</button>
              </li>
            )
          }
        </ul>
        {/* 声明 params 参数 */}
        {/* <Route component={Detail} path="/home/message/detail/:id/:title"></Route> */}

        {/* 声明 search 参数 */}
        {/* <Route component={Detail} path="/home/message/detail"></Route> */}

        {/* 声明 state 参数 */}
        <Route component={Detail} path="/home/message/detail"></Route>
    </div>
    )
  }
}

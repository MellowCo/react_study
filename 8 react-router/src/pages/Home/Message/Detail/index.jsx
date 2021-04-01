import React, { Component } from 'react'
import qs from 'querystring'

const contents = [
  {id:1,content:'内容1'},
  {id:2,content:'内容2'},
  {id:3,content:'内容3'},
]

export default class Detail extends Component {
  render() {
    //  接收 params 参数 
    // const {id,title} = this.props.match.params

    //  接收 search 参数 
    // const {search} = this.props.location
    // const {id,title} = qs.parse(search.slice(1))
    // const {content} = contents.find(val => val.id === +id)
    console.log(this.props);
    
    //  接收 search 参数 
    const {id,title} = this.props.location.state
    const {content} = contents.find(val => val.id === +id)

    return (
     <ul>
       <li>id:{id}</li>
       <li>title:{title}</li>
       <li>content:{content}</li>
     </ul>
    )
  }
}

import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class List extends Component {
  
  state = {
    isFirst:true,
    isLoading:false,
    isError:false,
    list:[]
  }

  // 订阅信息
  componentDidMount(){
    this.token = PubSub.subscribe('result',(_,data)=>{
      console.log(data);
      this.setState(data)
    })
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }


  render() {
    const {isFirst,isLoading,list,isError} = this.state

    return (
      <div className="row">
        {
          isFirst ? <h1>点击搜索</h1> :
          isLoading ? <h1>loding....</h1> :
          isError ? <h1>出错了</h1> :
          list.map(({id,avatar_url,login,url}) => (
          <div key={id} className="card">
            <a rel="noreferrer" href={url} target="_blank">
              <img alt="111" src={avatar_url} style={{width: '100px'}}/>
            </a>
            <p className="card-text">{login}</p>
          </div>
          ))
        }
    </div>
    )
  }
}

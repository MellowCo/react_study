import React, { Component, createRef } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  inputRef = createRef()

  handleClickSeachBtn = async ()=>{
    const name = this.inputRef.current.value
    // 发布消息
    PubSub.publish('result',{isFirst:false,isLoading:true})

    try {
      const response = await  fetch(`https://api.github.com/search/users?q=${name}`)
      const {items} = await response.json()
      PubSub.publish('result',{list:items,isLoading:false})
    } catch (error) {
      console.log(error);
      PubSub.publish('result',{isError:true,isLoading:false})
    }
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={this.inputRef} type="text" placeholder="enter the name you search"/>&nbsp;<button onClick={this.handleClickSeachBtn}>Search</button>
        </div>
      </section>
    )
  }
}

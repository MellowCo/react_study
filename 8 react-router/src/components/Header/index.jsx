import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {

  pushRoute = () =>{
    this.props.history.push('/home/message/detail',{id:1,title:"普通组件"})
  }

  render() {
    return (
      <div classNameName='row'>
        <div className='col-xs-offset-2 col-xs-8'>
          <div className='page-header'>
            <h2>React Router Demo</h2>
            <button onClick={this.pushRoute}>push</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
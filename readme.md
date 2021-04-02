# React 简介

**react 是什么？**

React 用于构建用户界面的 JS 库。是一个将数据渲染为 HTML 视图的开源 JS 库。

**为什么学？**

1.原生 JS 操作 DOM 繁琐，效率低

2.使用 JS 直接操作 DOM,浏览器会进行大量的重绘重排

3.原生 JS 没有组件化编码方案，代码复用低

# jsx 基础

- js 表达式使用 {} 接收
- class 类名 需要使用 className 代替
- style 内敛 使用 {{key:value}} 对象形式表示
- 组件标签需要大写开头 小写转化为 html 同名元素
- 使用 map 遍历生成 li

```html
<div id="app"></div>

<script src="../js/babel.min.js"></script>
<script src="../js/react.development.js"></script>
<script src="../js/react-dom.development.js"></script>

<style>
  .red_font {
    color: red;
  }
</style>

<!-- 使用babel 转换jsx -->
<script type="text/babel">
  const text = 'hello,react'
  const reactId = 'id'
  const data = ['angular', 'vue', 'react']

  const vdom = (
    <h1 id={reactId}>
      <span className='red_font' style={{ fontSize: '20px', backgroundColor: 'blue' }}>
        {text}
      </span>
      // map 遍历
      <ul>
        {data.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </h1>
  )
  // render(虚拟节点,容器)
  ReactDOM.render(vdom, document.getElementById('app'))
</script>
```

# 组件

## 1 函数组件

- 必须大写开头

* render 第一个参数使用标签形式

```js
// 1 函数组件
function MyComponent() {
  return <h1>函数组件</h1>
}

ReactDOM.render(<MyComponent />, document.getElementById('app'))
```

## 2 类组件

- 继承 React.Component 类
- 重写 render

```js
class MyClassComponent extends React.Component {
  render() {
    return <h1>类组件</h1>
  }
}

ReactDOM.render(<MyClassComponent />, document.getElementById('app'))
```

# 组件 3 大属性

## state

- state 用于保存组件中自定义数据

* 在 constructor 构造函数中初始化 state

```js
class Weather extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHot: true
    }
  }

  render() {
    return <h1>天气{this.state.isHot ? '炎热' : '凉爽'}</h1>
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'))
```

### onClick this 指向问题

```js
class Weather extends React.Component {
  constructor(props) {
    super(props)
    // 初始化数据
    this.state = {
      isHot: true
    }
  }

  changeWeather() {
    // undefined
    console.log(this)
  }

  render() {
    // 为什么this 为undefined
    return <h1 onClick={this.changeWeather}>天气{this.state.isHot ? '炎热' : '凉爽'}</h1>
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'))
```

- 使用类的实例对象 访问类的方法时 this 的指向为类本身
- 直接访问类的方式，由于开启了局部严格模式，导致 this 指向为 undefined

```js
class Person {
  study() {
    console.log(this)
  }
  // 默认开启严格模式
  study() {
    'use strict'
    console.log(this)
  }
}

// 实例访问
const p = new Person()
p.study() // Person

// 直接访问
const x = p.study
x() // undefined
```

- 严格模式的 this

```js
function demo1() {
  console.log(this) // window
}

function demo2() {
  'use strict'
  console.log(this) // undefined
}
```

### 通过 bind 改变 this 指向,setState 更改 state 的值

```js
class Weather extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHot: true
    }
    // 通过bind 使this指向Weather实例 并绑定在实例本身
    // this.changeWeather = this.changeWeather.bind(this)
    this.demo = this.changeWeather.bind(this)
  }

  changeWeather() {
    const { isHot } = this.state
    // 通过setState 更改state的值
    // 不允许直接更改
    // this.state.isHot = !isHot
    this.setState({
      isHot: !isHot
    })
  }

  render() {
    // 这里的demo 指的是实例本身的方式 指向原型链上的changeWeather
    return <h1 onClick={this.demo}>天气{this.state.isHot ? '炎热' : '凉爽'}</h1>
    // <h1 onClick={this.changeWeather}>天气{this.state.isHot ? '炎热' : '凉爽'}</h1>
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'))
```

![1](https://gitee.com/mellowco/BlobImg/raw/master/img/Snipaste_2021-02-27_20-27-36.png)

### 简写最终版

```js
class Weather extends React.Component {
  state = {
    isHot: true
  }
  // 通过赋值语句和箭头函数 解决this的问题
  // 将changeWeather 绑定在实例方法中
  changeWeather = () => {
    const { isHot } = this.state
    this.setState({
      isHot: !isHot
    })
  }

  render() {
    return <h1 onClick={this.changeWeather}>天气{this.state.isHot ? '炎热' : '凉爽'}</h1>
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'))
```

### 注意

- 组件中 render 方法中的 this 为组件实例对象
- 组件自定义的方法中 this 为 undefined，如何解决？
  - 强制绑定 this: 通过函数对象的 bind()
  - 箭头函数
- 状态数据，不能直接修改或更新

## props

- 用于传递组件数据
- 使用时通过 attribute,key=value 传递数据,组件内部使用 props.key 获取数据
- 可以通过`{ ...obj }` 批量传入数据

```js
class Person extends React.Component {
  render() {
    const { name, age } = this.props

    return (
      <ul>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    )
  }
}

ReactDOM.render(<Person name='bob' age={18} />, document.getElementById('app'))
// 批量传入
const personInfo = { name: 'bob2', age: 182 }
ReactDOM.render(<Person {...personInfo} />, document.getElementById('app'))
```

### props children

* 标签内的内容 会传递给`children` 属性

```js
class Person extends React.Component {
  render() {
    const { name, age ,children } = this.props
	// children = 这是children的内容
    return (
      <ul>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    )
  }
}

<Person name={name} age={age}>这是children的内容</Person>
```

### props 类型限制 默认值

- props 只读 不能修改
- 15.x 将类型限制挂载在 React 原型上,16.x 被抽离出来
- 通过 PropTypes 设置类型
  - 普通类型 string,number 使用小写开头
  - 函数类型 function 使用 func 表示
- 通过 defaultProps 设置默认值

```js
// 导入 类型限制 js
<script src='../js/prop-types.js'></script>

class Person extends React.Component {
  render() {
    const { name, age } = this.props

    return (
      <ul>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    )
  }
}

Person.propTypes = {
  // 15.x
  // name: React.PropTypes.string
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}

Person.defaultProps = {
  name: 'default'
}

ReactDOM.render(<Person age={18} />, document.getElementById('app'))
```

### 简写

- 通过 static 挂载到类上 而不是类的实例对象上

```js
class Person extends React.Component {
  static propTypes = {
    // 15.x
    // name: React.PropTypes.string
    name: PropTypes.string,
    age: PropTypes.number.isRequired
  }

  static defaultProps = {
    name: 'default'
  }

  render() {
    const { name, age } = this.props

    return (
      <ul>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    )
  }
}
```

## static 关键字

- 不使用 static 挂载到原型上

```js
class Point {
  toString() {
    // ...
  }

  constructor(props) {
    super()
    this.speak = xxx
  }
}

//等同于
class Point {}

Point.prototype = {
  toString() {
    // ...
  },
  speak: xxx
}
```

- static 挂载到类上,而不是实例对象

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}

Foo.classMethod() //hello
```

## constructor 构造器

[官方文档](https://zh-hans.reactjs.org/docs/react-component.html#constructor)

- 通常，在 React 中，构造函数仅用于以下两种情况：
  - 通过给 this.state 赋值对象来初始化内部 state。
  - 为事件处理函数绑定实例

```js
constructor(props) {
  // 必须通过 super 传递props
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

## refs

- 设置 ref 来标识 html 标签，保存在实例的 refs 中

### 1 string ref

```js
class RefComponent extends React.Component {
  getData = () => {
    const { inputRef } = this.refs
    console.log(inputRef.value)
  }

  render() {
    return (
      <div>
        <input ref='inputRef' type='text' />
        <button onClick={this.getData}>点击</button>
      </div>
    )
  }
}

ReactDOM.render(<RefComponent />, document.getElementById('app'))
```

### 2 回调函数 ref

- 通过回调函数设置 ref,函数的第一个参数为标签节点

```js
class RefComponent extends React.Component {
  getData = () => {
    const { inputRef } = this
    console.log(inputRef2.value)
  }

  render() {
    return (
      <div>
        <input ref={(c) => (this.inputRef = c)} type='text' />
        <button onClick={this.getData}>点击</button>
      </div>
    )
  }
}
```

- 回调函数 ref 的执行次数
  - 在调用 setState 后 回调函数 ref 会执行 2 次

```
 如果 ref 回调函数是以内联函数的方式定义的，
 在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。
 这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。
 通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，
 但是大多数情况下它是无关紧要的。
```

[官方文档](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#gatsby-focus-wrapper)

- 将 ref 的回调函数定义成 class 的绑定函数

```js
class RefComponent extends React.Component {
  getData = () => {
    const { inputRef } = this
    console.log(inputRef.value)
  }

  saveInputRef = (c) => {
    this.inputRef = c
  }

  render() {
    return (
      <div>
        <input ref={this.saveInputRef} type='text' />
        <button onClick={this.getData}>点击</button>
      </div>
    )
  }
}
```

### 3 使用 createRef

- 使用 createRef 设置 ref,ref 的 current 属性保存的是节点标签

```js
class RefComponent extends React.Component {
  inputRef = React.createRef()

  getData = () => {
    const { inputRef } = this
    console.log(inputRef.current.value)
  }

  render() {
    return (
      <div>
        <input ref={this.inputRef} type='text' />
        <button onClick={this.getData}>点击</button>
      </div>
    )
  }
}
```

# 生命周期

## 1 通过生命周期 卸载定时器

```js
class Life extends React.Component {
  death = () => {
    // 卸载组件的方法
    ReactDOM.unmountComponentAtNode(document.getElementById('app'))
  }

  state = {
    opacity: 1
  }

  // 组件挂载完成
  componentDidMount() {
    this.timer = setInterval(() => {
      let { opacity } = this.state

      this.setState({
        opacity: opacity <= 0 ? 1 : opacity - 0.1
      })
    }, 200)
  }

  // 组件被卸载
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <h1 style={{ opacity: this.state.opacity }}>React Life</h1>
        <button onClick={this.death}>卸载</button>
      </div>
    )
  }
}

ReactDOM.render(<Life />, document.getElementById('app'))
```

## 2 react 生命周期-旧

![](<https://gitee.com/mellowco/BlobImg/raw/master/img/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%97%A7).png>)

1. 初始化阶段: 由 ReactDOM.render()触发---初次渲染
   1. constructor()
   2. componentWillMount()
   3. render()
   4. componentDidMount() 开启定时器，发送网络请求，订阅消息
2. 更新阶段: 由组件内部 this.setSate()或父组件重新 render 触发
   1. shouldComponentUpdate()
   2. componentWillUpdate()
   3. render()
   4. componentDidUpdate()
3. 卸载组件: 由 ReactDOM.unmountComponentAtNode()触发
   1. componentWillUnmount() 关闭定时器，取消订阅消息

- shouldComponentUpdate
  - 返回值判断组件是否可以更新

```js
shouldComponentUpdate(){
  // 返回false 则不触发setState的数据更新
  return false //true
}
```

- forceUpdate
  - 不更改数据 强制刷新组件

```js
force = () => {
  this.forceUpdate()
}
```

- componentWillReceiveProps
  - 当父组件传递的 props 发生变化时 触发

```js
class A extends React.Component {
  state = {
    num: 1
  }

  addNum = () => {
    const { num } = this.state
    this.setState({
      num: num + 1
    })
  }

  render() {
    return (
      <div>
        <h1>this is A</h1>
        <button onClick={this.addNum}>加1</button>
        <B num={this.state.num} />
      </div>
    )
  }
}

class B extends React.Component {
  // 点击 加1 按钮，改变props，触发
  componentWillReceiveProps() {
    console.log('B---componentWillReceiveProps')
  }

  render() {
    return (
      <div>
        <h1>this is B, num:{this.props.num}</h1>
      </div>
    )
  }
}
```

## 3 react 生命周期-新

![](<https://gitee.com/mellowco/BlobImg/raw/master/img/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%96%B0).png>)

- 删除了 `componentWillMount`,`componentWillUpdate`,`componentWillReceiveProps`
- 新增 `getDerivedStateFromProps`,`getSnapshotBeforeUpdate`

### getDerivedStateFromProps

- 方法需要是用 static
- 其返回值会覆盖原有 state,state 中的数据**不能通过 setState 更改**
- 基本不使用

```js
state = {
  count:1
}

static getDerivedStateFromProps(props,state){
  // props :{count :100}
  return props
}

// 100
<div>count:{this.state.count}</div>
```

[getDerivedStateFromProps 文档](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)

### getSnapshotBeforeUpdate

[getSnapshotBeforeUpdate 文档](https://react.docschina.org/docs/react-component.html#static-getSnapshotBeforeUpdate)

# react脚手架

1. 全局安装 yarn add global create-react-app
2. 创建项目 yarn create react-app my-app

## 项目结构

![image-20210320150859913](https://gitee.com/MellowCo/BlobImg/raw/master/image-20210320150859913.png)

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!--%PUBLIC_URL%表示public文件夹的路径-->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <!--用于开启理想视口，用于移动端页面的适配-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--用于配置浏览器地址栏的颜色（仅支持安卓手机浏览器）-->
    <meta name="theme-color" content="#000000" />
    <!--描述网页信息的-->
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!--用于指定网页添加到手机主屏幕后的图标（仅仅支持ios）-->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
 
    <!--应用加壳时候的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  
    <title>React App</title>
  </head>
  <body>
    <!-- 浏览器不支持JS的运行的时候展现 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // 开启检测react语法
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 性能检测
reportWebVitals();
```

## 新建项目

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />

    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

### index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';

ReactDOM.render( <App/>,document.getElementById('root') )
```

### app.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';

ReactDOM.render( <App/>,document.getElementById('root') )
```

### Hello.jsx

```jsx
import {Component} from 'react';
import './index.css';

export default class Hello extends Component{
  render( ){
    return <h1 className="title">Hello React</h1> 
  }
}
```

### css模块化

1. 文件名 index.css-》index.module.css
2. 通过import引入

```js
import {Component} from 'react';
import hello from './index.module.css';

export default class Hello extends Component{
  render( ){
    return <h1 className={hello.title}>Hello React</h1> 
  }
}
```

## todoList

### 父向字传参

* {...obj}

```js
export default class List extends Component {
  render() {
    const {todoList,updateTodo} = this.props

    return (
    <ul className="todo-main">
      {
        todoList.map(todo => {
          return <Item updateTodo={updateTodo}  key={todo.id} {...todo}></Item>
        })
      }
    </ul>
    )
  }
}
```

### 子向父传参

* props 传递函数

```js
export default class Header extends Component {
  handleKeyUp= (e) => {
    const {key,target:{value}} = e

    if(value.trim() === ''){
      alert('不能为空')
      return
    }
    if(key === 'Enter'){
      const {addTodo} =  this.props
      // 通过nanoid 生成随机id
      // 传递给父组件
      addTodo({id:nanoid(),name:value,done:true})
      value = ''
    }
  }

  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    );
  }
}
```

```js
export default class App extends Component { 
    // 传递添加todo的回调函数
    addTodo = (todoObj)=>{
      const {todoList} = this.state
      this.setState({
        todoList:[todoObj,...todoList]
      })
    }
    
  render() {
    const {todoList} = this.state

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo = {this.addTodo}/>
          <List todoList={todoList} updateTodo={this.updateTodo}/>
          <Footer />
        </div>
      </div>
    );
  }
}
```

### 兄弟组件传参

>  下载 [pubsub-js](https://www.npmjs.com/package/pubsub-js)
>
> yarn add pubsub-js

```js
var mySubscriber = function (msg, data) {
    console.log( msg, data );
};
// 订阅
var token = PubSub.subscribe('MY TOPIC', mySubscriber);
// 发布
PubSub.publish('MY TOPIC', 'hello world!');
// 取消订阅
PubSub.unsubscribe(token);
```

#### app.js

```js
import './App.css';
import Search from './components/Search'
import List from './components/List'

function App() {
  return (
    <div className="container">
      <Search />
      <List />
  </div>
  );
}

export default App;

```

#### Search.jsx

```jsx
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
```

#### List.jsx

```jsx
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
  // 卸载组件 取消订阅	
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
```

### 添加类型限制

1. 导入相关依赖 yarn add prop-types

```js
import PropTypes from 'prop-types'

export default class List extends Component {
  // 限制props
  static propTypes = {
    todoList:PropTypes.array.isRequired,
    updateTodo:PropTypes.func.isRequired
  }

  render() {
    const {todoList,updateTodo} = this.props
    return (
    <ul className="todo-main">
      {
        todoList.map(todo => {
          return <Item updateTodo={updateTodo}  key={todo.id} {...todo}></Item>
        })
      }
    </ul>
    )
  }
}
```

## 服务器代理

### 1 package.json

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

### 2 setupProxy.js

> 在src下 新建配置文件 src/setupProxy.js

```js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值 欺骗服务器
      /*
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    proxy('/api2', { 
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {'^/api2': ''}
    })
  )
}
```

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

## [fetch](https://github.github.io/fetch/)

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';
xhr.onload = function() {
  console.log(xhr.response);
};
xhr.onerror = function() {
  console.log("Oops, error");
};
xhr.send();

// fetch
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))

try {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
// 注：这段代码如果想运行，外面需要包一个 async function
```



# react路由

> react-router-dom 应用于浏览器端的路由库
>
> react-router-native 应用于native端的路由

## 1 基本使用

1. 安装 react-router-dom 

```js
yarn add react-router-dom 
```

2. 在`index.js` 根组件外侧添加`Router`组件

```js
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
```

3.  使用`Link`和`Route`实现页面切换
   * `Link` 路由的跳转组件
   * `Route` 展示区 注册路由

```js
import { Link, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'


<Link className='list-group-item' to='/about'>
    About
</Link>
<Link className='list-group-item' to='/home'>
    Home
</Link>

<Route component={About} path='/about'></Route>
<Route component={Home} path='/home'></Route>
```

4. 路由组件的props

```js
import React, { Component } from 'react'

export default class About extends Component {
  render() {
    console.log(this.props);
      
    return (
      <h3>我是About的内容</h3>
    )
  }
}

history:
    action: "PUSH"
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
location:
    pathname: "/about"
    search: ""
    state: null
match:
    params: {}
    path: "/about"
    url: "/about"
```



## 2 NavLink

### 实现路由激活效果

* `NavLink`激活时，默认添加 `active` 类名

```js
<NavLink className='list-group-item' to='about'>
    About
</NavLink>

<a class="list-group-item active" href="/home" aria-current="page">Home</a>
```

* 通过`activeClassName` 改变激活类名

```js
<NavLink activeClassName='li_active' className='list-group-item' to='about'>
    About
</NavLink>

<a class="list-group-item li_active" href="/about" aria-current="page">About</a>
```

## 3 Switch

### 单一匹配

* `Route`会匹配多个路由，匹配到一个组件，还会向下匹配

```js
<Route component={About} path='/about'></Route>
<Route component={Home} path='/home'></Route>
<Route component={Test} path='/home'></Route>
// Home 和 Test 组件同时显示
```

* 通过`Switch`实现单一匹配

```js
<Switch>
    <Route component={About} path='/about'></Route>
    <Route component={Home} path='/home'></Route>
    <Route component={Test} path='/home'></Route>    
</Switch>
// 匹配到Home 直接返回
```

## 4 严格匹配

* 默认开启模糊匹配

```js
<Link to='/home/a/b'>
    Home
</Link>
// 匹配成功
<Route component={Home} path='/home'></Route>
```

* `exact` 开启严格模式

```js
<Route exact component={Home} path='/home'></Route> // 无法匹配 /home/a/b
```

## 5 Redirect

* 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

```js
<Switch>
    <Route component={About} path='/about'></Route>
    <Route component={Home} path='/home'></Route>
    <Redirect to='/home'></Redirect>    
</Switch>
```

## 6 嵌套路由

>  在Home组件中 添加嵌套路由

* Home

```js
export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <NavLink className="list-group-item" to="/home/news" >News</NavLink>
            </li>
            <li>
              <NavLink className="list-group-item" to="/home/message">Message</NavLink>
            </li>
          </ul>

          <Switch>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/message" component={Message}></Route>
            <Redirect to="/home/message"></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
}
```

* App

```js
function App() {
  return (
    <div>
      <div classNameName='row'>
        <div className='col-xs-offset-2 col-xs-8'>
          <div className='page-header'>
            <h2>React Router Demo</h2>
          </div>
        </div>
      </div>
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
            <Route component={About} path='/about'></Route>
            <Route component={Home} path='/home'></Route>
            <Redirect to='/home'></Redirect>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## 7 路由传参

### 1 params

* 在路由链接`Link`中 携带参数

* 在路由`Route`中 声明接收,通过 `:id`  来指定key

```js
export default class Message extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            message.map(val => 
              <li key={val.id}>
        		{/* params 传参 */}
               	<Link  to={`/home/message/detail/${val.id}/${val.title}`}>{val.title}					</Link>
              </li>
            )
          }
        </ul>
        {/* 声明 params 参数 */}
        <Route component={Detail} path="/home/message/detail/:id/:title"></Route>
    </div>
    )
  }
}
```

* 在路由组件中 通过`props` 获取

```js
export default class Detail extends Component {
  render() {
    //  接收 params 参数 
    const {id,title} = this.props.match.params
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
```

![image-20210326204755260](https://gitee.com/MellowCo/BlobImg/raw/master/image-20210326204755260.png)

### 2 search

* 传参

```js
{/* search 传参 */}
<Link  to={`/home/message/detail?id=${val.id}&title=${val.title}`}>{val.title}</Link>

{/* 不需要声明 search 参数 */}
<Route component={Detail} path="/home/message/detail"></Route>
```

* 接收

```js
//通过 querystring 转换 search参数为对象形式
import qs from 'querystring'

//  接收 search 参数 
const {search} = this.props.location
const {id,title} = qs.parse(search.slice(1))
const {content} = contents.find(val => val.id === +id)

return (
    <ul>
        <li>id:{id}</li>
        <li>title:{title}</li>
        <li>content:{content}</li>
    </ul>
)
```

![image-20210326210731104](https://gitee.com/MellowCo/BlobImg/raw/master/image-20210326210731104.png)

### 3 state

* 传参
* to 传递一个对象,`pathname`指定路径,`state`指定传递的数据

```js
{/* state 传参 */}
<Link  to={{pathname:'/home/message/detail',state:{id:val.id,title:val.title}}}>{val.title}</Link>

<Route component={Detail} path="/home/message/detail"></Route>
```

* 接收

```js
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
```

![image-20210326215226165](https://gitee.com/MellowCo/BlobImg/raw/master/image-20210326215226165.png)

## 8 replace

* 在`Link`中添加`replace` 开启路由replace模式

```js
<Link replace  to={{pathname:'/home/message/detail',state:{id:val.id,title:val.title}}}>{val.title}</Link>

```

## 9 编程式路由

> 使用`props`中`history`中的方法

* go
* goBack 返回
* goForward 前进
* push replace 路由跳转

![image-20210327215231723](https://gitee.com/MellowCo/BlobImg/raw/master/image-20210327215231723.png)

```js
<button onClick={this.pushRoute(val)}>push</button>
<button onClick={this.replaceRoute(val)}>replace</button>

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
```

## 10 普通组件使用route

* 使用`withRouter`导出加工后的新组件，使其带有`router`api

```js
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
```

## 11 BrowserRouter与HashRouter的区别

* 底层原理不一样：
     * BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
     * HashRouter使用的是URL的哈希值。

*  path表现形式不一样
     * BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
     * HashRouter的路径包含#,例如：localhost:3000/#/demo/test

* 刷新后对路由state参数的影响
     * BrowserRouter没有任何影响，因为state保存在history对象中。
     * HashRouter刷新后会导致路由state参数的丢失！！！

* 备注：HashRouter可以用于解决一些路径错误相关的问题。



#  redux

* redux是一个专门用于做**状态管理**的JS库(不是react插件库)。
* 它可以用在react, angular, vue等项目中, 但基本与**react**配合使用。
* 作用: 集中式管理react应用中多个组件**共享**的状态。

![](https://gitee.com/MellowCo/BlobImg/raw/master/redux%E5%8E%9F%E7%90%86%E5%9B%BE.png)

## 1 三个核心概念

### 1 action

* 动作的对象

* 包含2个属性
  * type：标识属性, 值为字符串, 唯一, 必要属性
  * data：数据属性, 值类型任意, 可选属性

* 例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }

### 2 reducer

*  用于初始化状态、加工状态。

* 加工时，根据旧的state和action， 产生新的state的**纯函数**。

### 3 store

* 将state、action、reducer联系在一起的对象

* 如何得到此对象?
  * import {createStore} from 'redux'
  * import reducer from './reducers'
  * const store = createStore(reducer)

* 此对象的功能?
  * getState(): 得到state
  * dispatch(action): 分发action, 触发reducer调用, 产生新的state
  * subscribe(listener): 注册监听, 当产生了新的state时, 自动调用

## 2 基本使用

1. 安装redux

> yarn add redux

2. 创建 store

```js
import {createStore} from 'redux'
import countReducer from './count_reducer'

// 引入 redux-thunk 用于支持异步action
import thunk from 'redux-thunk'

// 通过applyMiddleware 加载thunk 中间件
export default createStore(countReducer,applyMiddleware(thunk))
```

3. 常量文件`constant.js`

```js
export const INCREASE = 'increase'
export const DECREASE = 'decrease'
```

4. 创建`reducer`

```js

/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {DECREASE,INCREASE} from './constant'

const initState = 0
export default function countReducer(preState=initState,action){
  //从action对象中获取：type、data
  const {type,data} = action

  switch (type) {
    // 加
    case INCREASE:
      return preState + data
    // 减
    case DECREASE:
      return preState - data
    // 初始化
    default:
      return preState
  }
}  
```

4. 创建`action`

```js
import {DECREASE,INCREASE} from './constant'

export const createIncreaseAction = data => ({type:INCREASE,data})

export const createDecreaseAction = data => ({type:DECREASE,data})

// 异步action 返回一个函数 
// 通过同步action 操作数据
export const createAsyncIncreaseAction = data => {
  return (dispatch) => {
      setTimeout(() => {
        dispatch(createIncreaseAction(data))
      }, 1000)  
  }
}
```

5. 在组件中调用`reducer`，检测数据变化

```js
import React, { Component } from 'react'
import { Select } from 'antd';
const { Option } = Select;
import { Button } from 'antd';

import store from '../../store'
import {createDecreaseAction,createIncreaseAction,createAsyncIncreaseAction} from '../../store/count_action'


export default class Count extends Component {
  state = {
    value:1
  }

  componentDidMount(){
    // 在组件被创建时
    // 检测redux中状态的变化，只要变化，就调用render
    store.subscribe(()=>{
      this.setState({})
    })
  }

  handleChange = (value) =>{
    this.setState({
      value
    })
  }
  
  handleInc = () =>{
    // 通过 dispatch 调用reducer
    store.dispatch(createIncreaseAction(this.state.value*1))
  }

  handleAsyncInc = () =>{
    // 通过 dispatch 调用reducer
    store.dispatch(createAsyncIncreaseAction(this.state.value*1))
  }
  
  handleDec = () =>{
    store.dispatch(createDecreaseAction(this.state.value*1))
  }
  

  render() {
    return (
      <div>
        <h1>Num:{store.getState()}</h1>
        <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>

        <Button type="primary" onClick={this.handleInc}>加</Button>
        <Button type="primary" danger onClick={this.handleDec}>减</Button>
        <Button type="primary" onClick={this.handleAsyncInc}>异步加</Button>
      </div>
    )
  }
}
```

6. 在`index`中检测`redux`数据变化

```js
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```

# react-redux

![react-redux模型图](https://gitee.com/MellowCo/BlobImg/raw/master/react-redux%E6%A8%A1%E5%9E%8B%E5%9B%BE.png)

1. 安装`react-redux`

```js
yarn add react-redux
```

2. 在`container`文件加下 创建容器组件`Count`,通过`connect`连接UI组件

```js
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
//引入Count的UI组件
import CountUI from '../../components/Count'
//引入action
import {createAsyncIncreaseAction,createDecreaseAction,createIncreaseAction} from '../../store/count_action'

// 传递props中的状态
// state 为reducer中initState
// 等价于<Count count={state}>
function mapStateToProps(state){
  return {count:state}
}

// 传递props中的操作状态的方法
function mapDispatchToProps(dispatch){
  return {
    increase:(val) => dispatch(createIncreaseAction(val)),
    decrease:(val) => dispatch(createDecreaseAction(val)),
    increaseAsync:(val) => dispatch(createAsyncIncreaseAction(val)),
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)
```

![image-20210401221429857](https://gitee.com/MellowCo/BlobImg/raw/master/image-20210401221429857.png)

3. 在容器组件中关联`store` 通过`props`关联

```js
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
```

4. 在`Count`UI组件中，通过`props`操作`store`状态	

```js
import React, { Component } from 'react'
import { Select } from 'antd';
import { Button } from 'antd';
const { Option } = Select;

export default class Count extends Component {
  state = {
    value:1
  }

  handleChange = (value) =>{
    this.setState({
      value
    })
   
  handleInc = () =>{
    // 调用props中加法
    this.props.increase(this.state.value*1)
  }

  handleAsyncInc = () =>{
    // 调用props中异步加法
    this.props.increaseAsync(this.state.value*1)
  }
  
  handleDec = () =>{
    // 调用props中减法
    this.props.decrease(this.state.value*1)
  }
  

  render() {
    return (
      <div>
        <h1>Num:{this.props.count}</h1>
        <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>

        <Button type="primary" onClick={this.handleInc}>加</Button>
        <Button type="primary" danger onClick={this.handleDec}>减</Button>
        <Button type="primary" onClick={this.handleAsyncInc}>异步加</Button>
      </div>
    )
  }
}
```






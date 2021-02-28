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

## 简写最终版

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

### props 类型限制 默认值

- props 只读 不能修改
- 15.x 将类型限制挂载在 React 原型上,16.x 被抽离出来
- 通过 PropTypes 设置类型
  - 普通类型 string,number 使用小写开头
  - 函数类型 function 使用 func 表示
- 通过 defaultProps 设置默认值

```js
// 导入 类型限制 js
;<script src='../js/prop-types.js'></script>

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

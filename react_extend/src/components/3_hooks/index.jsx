import React, { useEffect, useRef, useState } from 'react'
import { unmountComponentAtNode } from 'react-dom'

export default function Demo() {
  //[当前状态的值,更新状态的方法]
  const [number, setNumber] = useState(0)
  const [name, setName] = useState('li')

  // ref
  const inputRef = useRef()

  // 第2个参数 为空
  // componentDidMount componentDidUpdate componentWillUnmount
  useEffect(() => {
    console.log('update....')
    // 组件卸载的回调
    return () => {
      console.log('update Unmount')
    }
  })

  // 第2个参数 为空数组
  // componentDidMount componentWillUnmount
  useEffect(() => {
    console.log('Mount....')
    // 组件卸载的回调
    return () => {
      console.log('Mount Unmount')
    }
  }, [])

  // 监听number
  useEffect(() => {
    console.log('number改变了')
    // 组件卸载的回调
    return () => {
      console.log('number Unmount')
    }
  }, [number])

  // 监听name
  useEffect(() => {
    console.log('name改变了')
    // 组件卸载的回调
    return () => {
      console.log('name Unmount')
    }
  }, [name])

  // 监听多个状态
  useEffect(() => {
    console.log('监听name和number')
  }, [name, number])

  function change() {
    setName(inputRef.current.value)
  }

  function add() {
    // 1 直接设置值
    // setNumber(number + 1)

    //2 函数形式
    setNumber((val) => val + 1)
  }

  function destroy() {
    unmountComponentAtNode(document.getElementById('root'))
  }

  return (
    <div>
      <input type='text' ref={inputRef} />
      <h1>数字:{number}</h1>
      <h1>姓名:{name}</h1>
      <button onClick={add}>+1</button>
      <button onClick={change}>改名</button>
      <button onClick={destroy}>卸载</button>
    </div>
  )
}

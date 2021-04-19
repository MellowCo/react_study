import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'

export default function Demo() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount((state) => state + 1)
    }, 1000)
  }, [])

  // 当第二个参数为 [] 默认初始化一次
  // 将改方法缓存 打印的count 为0
  // const handleClick = useCallback(() => {
  //   console.log(count) // 0
  // }, [])

  // count变化重新生成方法
  const handleClick = useCallback(() => {
    console.log(count) // 0
  }, [count])

  return <h1 onClick={handleClick}>{count}</h1>
}

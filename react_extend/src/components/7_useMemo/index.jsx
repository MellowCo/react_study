import React, {
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react'

export default function Demo() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  console.log('更新了...', Date.now())

  useEffect(() => {
    setInterval(() => {
      setCount((state) => state + 1)
    }, 2000)

    setInterval(() => {
      setOther((state) => state + 1)
    }, 500)
  }, [])

  // const result = count * 2

  const result = useMemo(() => {
    console.log('--------result-------')
    return count * 2
  }, [count])

  return (
    <h1 style={{ textAlign: 'center' }}>
      {other}-{count}-{result}
    </h1>
  )
}

import {DECREASE,INCREASE} from '../constant'


export const increase = data => ({type:INCREASE,data})

export const decrease = data => ({type:DECREASE,data})

// 异步action 返回一个函数 
// 通过同步action 操作数据
export const asyncIncrease = data => {
  return (dispatch) => {
      setTimeout(() => {
        dispatch(increase(data))
      }, 1000)  
  }
}
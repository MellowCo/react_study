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
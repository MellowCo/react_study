
/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {DECREASE,INCREASE} from '../constant'


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
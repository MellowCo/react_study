import { createStore, applyMiddleware, combineReducers } from 'redux'
// count的Reducer 和 person的Reducer
import countReducer from './reducer/count'
import personReducer from './reducer/person'

// 引入 redux-thunk 用于支持异步action
import thunk from 'redux-thunk'

// 通过 combineReducers 合并Reducer
const allReducers = combineReducers({
  countData: countReducer,
  personsData: personReducer
})

// 通过applyMiddleware 加载thunk 中间件
export default createStore(allReducers, applyMiddleware(thunk))

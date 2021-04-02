import {createStore,applyMiddleware} from 'redux'
import countReducer from './count_reducer'
// 引入 redux-thunk 用于支持异步action
import thunk from 'redux-thunk'

// 通过applyMiddleware 加载thunk 中间件
export default createStore(countReducer,applyMiddleware(thunk))
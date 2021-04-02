import { connect } from 'react-redux'
import CountUI from '../../components/Count'
import { createAsyncIncreaseAction, createDecreaseAction, createIncreaseAction } from '../../store/count_action'

// 定义props中的状态
// state 为reducer中initState
// 等价于<Count count={state}>
// function mapStateToProps(state){
//   return {count:state}
// }

// // 定义props中的操作状态的方法
// function mapDispatchToProps(dispatch){
//   return {
//     increase:(val) => dispatch(createIncreaseAction(val)),
//     decrease:(val) => dispatch(createDecreaseAction(val)),
//     increaseAsync:(val) => dispatch(createAsyncIncreaseAction(val)),
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(CountUI)

export default connect(
  (state) => ({
    count: state
  }),
  {
    increase: createIncreaseAction,
    decrease: createDecreaseAction,
    increaseAsync: createAsyncIncreaseAction
  }
)(CountUI)

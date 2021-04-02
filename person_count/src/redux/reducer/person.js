import { ADD_USER } from '../constant'

const initState = []
export default function personReducer(preState = initState, action) {
  const { type, data } = action

  switch (type) {
    case ADD_USER:
      return [...preState, data]
    default:
      return preState
  }
}

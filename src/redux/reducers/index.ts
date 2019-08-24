import { combineReducers } from 'redux'
import numReducer from './add'
import postReducer from './getPost'

const rootReducer = combineReducers({
  numReducer,
  postReducer
})
export default rootReducer
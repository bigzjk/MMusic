import { combineReducers } from 'redux'
import numReducer from './add'
import homeReducer from './home'

const rootReducer = combineReducers({
  numReducer,
  homeReducer
})
export default rootReducer
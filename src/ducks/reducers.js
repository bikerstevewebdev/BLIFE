import { combineReducers } from 'redux'
import macros from './macroCalcReducer'
import foods from './foodReducer'
import users from './userReducer'

export default combineReducers({
    users,
    foods,
    macros
  })
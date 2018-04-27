import { combineReducers } from 'redux'
import macros from './macroCalcReducer'
import foods from './foodReducer'
import users from './userReducer'
import fitness from './fitnessReducer'

export default combineReducers({
    users,
    foods,
    macros,
    fitness
  })
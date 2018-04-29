import { combineReducers } from 'redux'
import macros from './macroCalcReducer'
import foods from './foodReducer'
import users from './userReducer'
import fitness from './fitnessReducer'
import coach from './coachReducer'

export default combineReducers({
    users,
    foods,
    macros,
    fitness,
    coach
  })
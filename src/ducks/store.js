import { createStore, applyMiddleware } from 'redux'
// import userReducer from './userReducer'
import macroCalcReducer from './macroCalcReducer'
import  reduxPromiseMiddleware  from 'redux-promise-middleware'

export default createStore( macroCalcReducer, applyMiddleware(reduxPromiseMiddleware()) )
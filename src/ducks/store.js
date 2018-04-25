import { createStore, applyMiddleware } from 'redux'
import  reduxPromiseMiddleware  from 'redux-promise-middleware'
// import macros from './macroCalcReducer'
// import foods from './foodReducer'
// import users from './userReducer'
import reducer from './reducers'

export default createStore( reducer, applyMiddleware(reduxPromiseMiddleware()) )
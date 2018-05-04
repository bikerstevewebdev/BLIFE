import { createStore, applyMiddleware, compose } from 'redux'
import  reduxPromiseMiddleware  from 'redux-promise-middleware'
// import macros from './macroCalcReducer'
// import foods from './foodReducer'
// import users from './userReducer'
import reducer from './reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default createStore(reducer, composeEnhancers(applyMiddleware(reduxPromiseMiddleware())))
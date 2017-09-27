import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import * as reducers from '../reducers'

export default function configureStore() {
  console.log('REDUCERS', reducers)
  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunkMiddleware)
  )
}

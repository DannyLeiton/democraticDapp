import { Map, List, fromJS } from 'immutable'

import {
  USER_REQUEST_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_ACTION_SUCCESS,
  USER_ACTION_FAIL,
  RESET_USER_STATE,
  LOGOUT,
  USER_LIST_SUCCESS,
  GET_USER,
} from 'actions/userActions'

const EMPTY_USER = Map({
  userid: null,
  fullname: null,
  email: null,
  token: null,
})
const INITIAL_STATE = Map({
  fetching: false,
  logedin: false,
  errors: List(),
  user: EMPTY_USER,
  admins: List(),
  currentUser: Map(),
  lastActionCall: null,
})

const handlers = {
  [RESET_USER_STATE]: () => INITIAL_STATE,
  [USER_REQUEST_START]: (state) => state.set('fetching', true),
  [LOGOUT]: (state) => state.merge({
    logedin: false,
    user: EMPTY_USER,
  }),
  [LOGIN_SUCCESS]: (state, { response }) => state.merge({
    user: fromJS(response),
    fetching: false,
    logedin: true,
    errors: List(),
  }),
  [LOGIN_FAIL]: (state, { response }) => state.merge({
    errors: state.set('errors', List(response)),
    fetching: false,
    logedin: false,
  }),
  [USER_ACTION_SUCCESS]: (state) => state.merge({
    fetching: false,
    errors: List(),
  }),
  [USER_ACTION_FAIL]: (state, { response }) => state.merge({
    errors: state.get('errors').push(response),
    fetching: false,
  }),
  [USER_LIST_SUCCESS]: (state, { response }) => state.merge({
    admins: fromJS(response),
    fetching: false,
  }),
  [GET_USER]: (state, { response }) => state.merge({
    currentUser: fromJS(response),
    fetching: false,
    lastActionCall: GET_USER,
  }),
}

export default function user(state = INITIAL_STATE, { type, ...response }) {
  return handlers[type] ? handlers[type](state, response) : state
}

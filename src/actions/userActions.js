import { post, get, put, delete as deleteRequest } from 'axios'

import { MAIN_API, errors } from 'constants/api'
import * as storage from 'helpers/storage'
import { getAuthHeaders } from 'helpers/api'

// DELETE
import loginSuccess from 'mock/loginSuccess.json'

export const RESET_USER_STATE = 'RESET_USER_STATE'
export const USER_REQUEST_START = 'USER_REQUEST_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const USER_ACTION_SUCCESS = 'USER_ACTION_SUCCESS'
export const USER_ACTION_FAIL = 'USER_ACTION_FAIL'
export const LOGOUT = 'LOGOUT'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const GET_USER = 'GET_USER'
export const RECOVER_SUCCESS = 'RECOVER_SUCCESS'

export function login(payload) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await post(`${MAIN_API}/user/authenticate`, payload)

      storage.set('user', response.data)
      dispatch({ type: LOGIN_SUCCESS, response: response.data })
    } catch(error) {
      console.log('ERROR', error)
      const message = errors[401]

      storage.remove('user')
      dispatch({ type: LOGIN_FAIL, response: message })
    }
  }
}

export function recoverPassword(payload) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await post(`${MAIN_API}/user/recover`, payload)

      window.open(response.data.url)
      dispatch({ type: USER_ACTION_SUCCESS })
    } catch(error) {
      const response = error.response || {}
      const data = response.data || {}

      const message = errors[data.code || response.status || 401]

      dispatch({ type: USER_ACTION_FAIL, response: message })
    }
  }
}

export function loginFromStorage() {
  return (dispatch) => {
    dispatch({ type: USER_REQUEST_START })

    const user = storage.get('user')
    console.log('USER', user)

    if(user) {
      dispatch({ type: LOGIN_SUCCESS, response: user })
    } else {
      dispatch({ type: RESET_USER_STATE })
    }
  }
}

export function createUser(payload) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await post(`${MAIN_API}/user/`, payload, { headers: getAuthHeaders() })

      window.open(response.data.url)
      dispatch({ type: USER_ACTION_SUCCESS, response: response.data })
    } catch(error) {
      const response = error.response || {}
      const data = response.data || {}

      const message = errors[data.code || response.status || 401]

      dispatch({ type: USER_ACTION_FAIL, response: message })
    }
  }
}

export function updateUser(payload, id) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await put(`${MAIN_API}/user/${id}`, payload)

      dispatch({ type: GET_USER, response: response.data })
    } catch(error) {
      const response = error.response || {}
      const data = response.data || {}

      const message = errors[data.code || response.status || 401]

      dispatch({ type: USER_ACTION_FAIL, response: message })
    }
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    storage.remove('user')
    dispatch({ type: LOGOUT })
  }
}

export function getUsers() {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await get(`${MAIN_API}/user/list`, { headers: getAuthHeaders() })
      console.log('RESPONSE', response)

      dispatch({ type: USER_LIST_SUCCESS, response: response.data })
    } catch(error) {
      console.log('ERROR', error)
      const message = errors[401]

      dispatch({ type: USER_ACTION_FAIL, response: message })
    }
  }
}

export function getUser(userId) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await get(`${MAIN_API}/user/${userId}`, { headers: getAuthHeaders() })
      console.log('RESPONSE', response)

      dispatch({ type: GET_USER, response: response.data })
    } catch(error) {
      console.log('ERROR', error)
      const message = errors[401]

      dispatch({ type: USER_ACTION_FAIL, response: message })
    }
  }
}

export function deleteUser(userId) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await deleteRequest(`${MAIN_API}/user/${userId}`, { headers: getAuthHeaders() })

      dispatch({ type: USER_ACTION_SUCCESS, response: response.data })
    } catch(error) {
      console.log('ERROR', error)
      const message = errors[401]

      dispatch({ type: USER_ACTION_FAIL, response: message })
    }
  }
}

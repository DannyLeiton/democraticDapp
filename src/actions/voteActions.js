import { post, get, put, delete as deleteRequest } from 'axios'

import { MAIN_API, errors } from 'constants/api'
import * as storage from 'helpers/storage'
import { getAuthHeaders } from 'helpers/api'

export const VOTE_REQUEST_START = 'VOTE_REQUEST_START'
export const OPTION_LIST_SUCCESS = 'OPTION_LIST_SUCCESS'
export const VOTE_ACTION_FAIL = 'VOTE_ACTION_FAIL'
export const VOTE_ACTION_SUCCESS = 'VOTE_ACTION_SUCCESS'

export function getOptions(contractId) {
  return async (dispatch) => {
    dispatch({ type: VOTE_REQUEST_START })
    try {
      const response = await get(`${MAIN_API}/options/${contractId}`, { headers: getAuthHeaders() })
      console.log('RESPONSE', response)

      dispatch({ type: OPTION_LIST_SUCCESS, response: response.data })
    } catch(error) {
      console.log('ERROR', error)
      const message = errors[401]

      dispatch({ type: VOTE_ACTION_FAIL, response: message })
    }
  }
}

export function emitVote(payload) {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_START })
    try {
      const response = await post(`${MAIN_API}/vote/`, payload)

      dispatch({ type: VOTE_ACTION_SUCCESS, response: response.data })
    } catch(error) {
      console.log('ERROR', error)
      const message = errors[401]

      dispatch({ type: VOTE_ACTION_FAIL, response: message })
    }
  }
}

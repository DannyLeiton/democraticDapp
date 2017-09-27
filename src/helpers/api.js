import { get } from './storage'

export function getAuthHeaders() {
  const user = get('user')
  console.log('USER', user)

  return { Authorization: user.token }
}

export function get(key) {
  const value = localStorage.getItem(key)

  if(!value) return null

  return JSON.parse(value)
}

export function set(key, value) {
  if(typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

export function remove(key) {
  localStorage.removeItem(key)
}

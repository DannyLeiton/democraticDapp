export function templateRoute(route, values) {
  let formattedRoute = route

  Object.keys(values).forEach((key) => {
    const value = values[key]

    formattedRoute = formattedRoute.replace(`:${key}`, value)
  })

  return formattedRoute
}

import jwt from 'jsonwebtoken'
import config from '../../config'

export default function(request, response, next) {
  const token = request.headers.authorization
  const secret = config.jwt.secret

  try {
    const jwtPayload = jwt.verify(token, secret)

    request.jwtPayload = jwtPayload

    return next()
  } catch(err) {
    console.log('ERR', err.message)
    return response.sendStatus(403)
  }
}

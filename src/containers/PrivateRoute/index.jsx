import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { LOGIN } from 'constants/paths'

function PrivateRoute({ component: Component, token, ...rest }): ReactElement {
  return (
    <Route {...rest} render={props => (
      token
       ? <Component {...props}/>
       : <Redirect to={{
          pathname: LOGIN,
          state: { from: props.location }
        }}/>
    )}/>
  )
}

export default connect(({ user }) => ({ token: user.get('logedin') }))(PrivateRoute)

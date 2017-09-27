import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { logout } from 'actions/userActions'
import { DASHBOARD } from 'constants/paths'

import './styles.scss'

@connect(
  ({ user }) => ({
    logedin: user.get('logedin')
  }),
  { logout }
)
class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { logedin, logout, history } = this.props

    return (
      <header id="header" className="row header">
        <button onClick={() => history && history.push(DASHBOARD)} className="waves-effect waves-light btn">
          DASHBOARD
        </button>
        HEADER
        {logedin &&
          <button onClick={logout} className="waves-effect waves-light btn">
            LOGOUT
          </button>
        }
      </header>
    )
  }
}

export default Header

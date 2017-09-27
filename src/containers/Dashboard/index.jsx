import React, { PureComponent } from 'react'

import { Header } from 'components'
import {
  CREATE_USER,
  CREATE_VOTING,
  LIST_USERS,
} from 'constants/paths'

import './styles.scss'

class Dashboard extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {    return (
      <div>
        <Header />
        <div id="dashboard" className="row">
          <button
            className="waves-effect waves-light btn"
            onClick={this._handleRedirect(CREATE_USER)}
          >
            Crear usuario
          </button>
          <button
            className="waves-effect waves-light btn"
            onClick={this._handleRedirect(CREATE_VOTING)}
          >
            Crear Votacion
          </button>
          <button
            className="waves-effect waves-light btn"
            onClick={this._handleRedirect(LIST_USERS)}
          >
            Administradores
          </button>
        </div>
      </div>
    )
  }

  _handleRedirect = (route) => () => {
    this.props.history.push(route)
  }
}

export default Dashboard

import React, { PureComponent } from 'react'

import { Header } from 'components'
import { LOGIN } from 'constants/paths'

import './styles.scss'

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className="row main-wrapper">
          <button
            className="waves-effect waves-light btn"
            onClick={this._handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  _handleLoginClick = () => {
    this.props.history.push(LOGIN)
  }
}

export default Home

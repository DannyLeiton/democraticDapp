import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login, loginFromStorage } from 'actions/userActions'
import { DASHBOARD, RECOVER_PASSWORD } from 'constants/paths'

import LoginBox from './LoginBox'
import './styles.scss'

@connect(
  ({ user }) => ({
    fetching: user.get('fetching'),
    logedin: user.get('logedin'),
    errors: user.get('errors'),
    token: user.getIn(['user', 'token']),
  }),
  { login, loginFromStorage }
)
class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { redirectTo: null }
  }

  componentWillMount() {
    const { from } = this.props.location.state || {}

    if(from) {
      this.setState({ redirectTo: from })
    }
  }

  componentDidMount() {
    if(!this.props.token) {
      this.props.loginFromStorage()
    }
  }

  render() {
    const { logedin, errors } = this.props
    const { redirectTo } = this.state

    if(logedin) return <Redirect to={redirectTo || DASHBOARD}/>

    return (
      <section id="login">
        <LoginBox
          onSubmit={this._handleSubmit}
          errors={errors}
          handleForgetPassword={this._handleForgetPassword}
        />
      </section>
    )
  }

  _handleSubmit = (payload) => {
    this.props.login(payload)
  }

  _handleForgetPassword = (event) => {
    event.preventDefault()

    this.props.history.push(RECOVER_PASSWORD)
  }
}

export default Login

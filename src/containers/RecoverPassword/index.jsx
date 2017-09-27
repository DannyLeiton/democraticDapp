import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { LOGIN } from 'constants/paths'
import { recoverPassword } from 'actions/userActions'

import './styles.scss'

@connect(
  ({ user }) => ({
    errors: user.get('errors'),
  }),
  { recoverPassword }
)
class RecoverPassword extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { email: '' }
  }

  render() {
    const { errors } = this.props
    const { email } = this.state

    return (
      <section>
        <div className="recover-form">
          <form onSubmit={this._handleSubmit}>
            <div className="input-field col">
              <input
                className="validate"
                data-target="email"
                onChange={(event) => this.setState({ email: event.target.value })}
                placeholder="Correo"
                type="text"
                value={email}
              />
            </div>
            <div className="errors">
              {errors.map((message) =>(
                <span>{message}</span>
              ))}
            </div>
            <button type="submit" className="waves-effect waves-light btn">
              Enviar
            </button>
          </form>
        </div>
      </section>
    )
  }

  _handleSubmit = (event) => {
    event.preventDefault()

    this.props.recoverPassword({ email: this.state.email })
  }
}

export default RecoverPassword

import React, { PureComponent } from 'react'

const INITAL_STATE = {
  inputs: {
    email: '',
    password: '',
  }
}

class LoginBox extends PureComponent {
  constructor(props) {
    super(props)

    this.state = INITAL_STATE
  }

  render() {
    const { inputs: { email, password }} = this.state
    const { errors, handleForgetPassword } = this.props

    return (
      <div className="login-box">
        <form onSubmit={this._handleSubmit}>
          <div className="input-field col">
            <input
              className="validate"
              data-target="email"
              onChange={this._handleInputChange}
              placeholder="Correo"
              type="text"
              value={email}
            />
          </div>
          <div className="input-field">
            <input
              className="validate"
              data-target="password"
              id="last_name"
              onChange={this._handleInputChange}
              placeholder="Contraseña"
              type="password"
              value={password}
            />
          </div>
          <div className="errors">
            {errors.map((message) =>(
              <span>{message}</span>
            ))}
          </div>
          <a href="#" onClick={handleForgetPassword}>¿Olvido su contraseña?</a>
          <button type="submit" className="waves-effect waves-light btn">
            Login
          </button>
        </form>
      </div>
    )
  }

  _handleSubmit = (event) => {
    event.preventDefault()

    this.props.onSubmit(this.state.inputs)
  }

  _handleInputChange = (event) => {
    const inputKey = event.target.dataset.target
    const value = event.target.value

    this.setState(({ inputs }) => ({ inputs: { ...inputs, [inputKey]: value }}))
  }
}

export default LoginBox

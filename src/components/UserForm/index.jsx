import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const INITIAL_STATE = {
  inputs: {
    email: '',
    fullname: '',
  }
}

class UserForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = INITIAL_STATE
  }

  componentDidMount() {
    this._fillInputs(this.props.values)
  }

  componentWillReceiveProps({ values: nextValues }) {
    if(nextValues !== this.props.values) {
      this._fillInputs(nextValues)
    }
  }

  render() {
    const { inputs:  { fullname, email }} = this.state
    const { errors, className, buttonText } = this.props

    return (
      <form onSubmit={this._handleSubmit} className={className}>
        <div className="input-field col">
          <input
            className="validate"
            data-target="fullname"
            onChange={this._handleInputChange}
            placeholder="Nombre completo"
            type="text"
            value={fullname}
          />
        </div>
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
        <div className="errors">
          {errors && errors.map((message, key) =>(
            <span key={key}>{message}</span>
          ))}
        </div>
        <button type="submit" className="waves-effect waves-light btn">
          {buttonText}
        </button>
      </form>
    )
  }

  clearForm = () => {
    this.setState(INITIAL_STATE)
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

  _fillInputs = (nextValues) => {
    if(!nextValues) return

    this.setState(({ inputs }) =>({ inputs: { ...inputs, ...nextValues.toJS() }}))
  }
}

export default UserForm

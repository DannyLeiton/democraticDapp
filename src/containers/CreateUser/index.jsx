import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Header, UserForm, UserFormContainer } from 'components'
import { createUser } from 'actions/userActions'

import './styles.scss'

@connect(
  ({ user }) => ({
    fetching: user.get('fetching'),
    errors: user.get('errors'),
  }),
  { createUser }
)
class CreateUser extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { showSuccess: false }
  }

  componentWillReceiveProps(nextProps) {
    const { fetching: willBeFetching } = nextProps
    const { fetching } = this.props

    if(fetching && !willBeFetching) {
      this._handleRegisterResult(nextProps)
    }
  }

  render() {
    const { showSuccess } = this.state
    const { errors, history } = this.props

    return (
      <div>
        <Header history={history} />
        <div id="create-user" className="row">
          <UserFormContainer>
            {showSuccess && <span>Usuario creado correctamente</span>}
            <UserForm
              ref={(ref) => this._userForm = ref}
              buttonText="Crear usuario"
              onSubmit={this._handleSubmit}
              errors={errors}
            />
          </UserFormContainer>
        </div>
      </div>
    )
  }

  _handleSubmit = (payload) => {
    this.props.createUser(payload)
  }

  _handleRegisterResult = ({ errors }) => {
    if(errors && errors.size) return

    this._userForm.clearForm()
    this.setState({ showSuccess: true }, () => {
      setTimeout(() => this.setState({ showSuccess: false }), 2000)
    })
  }
}

export default CreateUser

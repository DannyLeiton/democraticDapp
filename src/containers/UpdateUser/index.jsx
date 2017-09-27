import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Header, UserForm, UserFormContainer } from 'components'
import {
  updateUser,
  getUser,
  USER_ACTION_SUCCESS,
} from 'actions/userActions'

import './styles.scss'

@connect(
  ({ user }) => ({
    fetching: user.get('fetching'),
    errors: user.get('errors'),
    lastActionCall: user.get('lastActionCall'),
    currentUser: user.get('currentUser'),
  }),
  { updateUser, getUser }
)
class UpdateUser extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { showSuccess: false }
  }

  componentWillMount() {
    console.log('THIS.PROPS.MATCH.PARAMS.ID', this.props.match.params.id)
    this.props.getUser(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    const { fetching: willBeFetching, lastActionCall } = nextProps
    const { fetching } = this.props

    if(fetching && !willBeFetching) {
      if(lastActionCall === USER_ACTION_SUCCESS) {
        this._handleUpdateResult(nextProps)
      }
    }
  }

  render() {
    const { showSuccess } = this.state
    const { history, currentUser } = this.props

    return (
      <div>
        <Header history={history} />
        <div id="modify-user" className="row">
          <UserFormContainer>
            {showSuccess && <span>Usuario actualizado correctamente</span>}
            <UserForm
              buttonText="Actualizar"
              onSubmit={this._handleSubmit}
              values={currentUser}
            />
          </UserFormContainer>
        </div>
      </div>
    )
  }

  _handleSubmit = (payload) => {
    const { id } = this.props.match.params
    console.log('ID', id)

    this.props.updateUser(payload, id)
  }

  _handleUpdateResult = ({ errors }) => {
    if(errors && errors.size) return

    this.setState({ showSuccess: true })
  }
}

export default UpdateUser

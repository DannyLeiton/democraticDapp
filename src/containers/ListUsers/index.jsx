import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { getUsers, deleteUser } from 'actions/userActions'
import { UPDATE_USER } from 'constants/paths'
import { templateRoute } from 'helpers/routes'
import { Header } from 'components'

import UserItem from './UserItem'

@connect(
  ({ user }) => ({
    admins: user.get('admins'),
    logedinUserId: user.getIn(['user', 'userId']),
    errors: user.get('errors'),
    fetching: user.get('fetching'),
  }),
  { getUsers, deleteUser }
)
class ListUsers extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { admins: null, didDelete: false }
  }

  componentWillMount() {
    this.props.getUsers()
  }

  componentWillReceiveProps(nextProps) {
    const { admins: nextAdmins, fetching: willBeFetching } = nextProps
    const { admins, fetching } = this.props
    const { didDelete } = this.state

    if(admins !== nextAdmins) {
      this._filterLogedinAdmin(nextAdmins)
    }

    if(fetching && !willBeFetching && didDelete) {
      this._handleDeleteResult(nextProps)
    }
  }

  render() {
    const { admins } = this.state
    const { history } = this.props

    return (
      <section>
        <Header history={history} />
        <ul className="collection with-header">
          <li className="collection-header"><h4>Administradores</h4></li>
          {admins && !admins.size &&
            <span>No hay administradores en el sistema</span>
          }
          {admins && admins.map((admin) =>(
            <UserItem
              fullname={admin.get('fullname')}
              key={admin.get('userId')}
              onUpdate={this._handleUpdate(admin.get('userId'))}
              onDelete={this._handleDelete(admin.get('userId'))}
            />
          ))}
        </ul>
      </section>
    )
  }

  _filterLogedinAdmin = (admins) => {
    const { logedinUserId } = this.props

    this.setState({ admins: admins.filter((admin) => admin.get('userId') !== logedinUserId) })
  }

  _handleUpdate = (userId) => (event) => {
    event.preventDefault()

    this.props.history.push(templateRoute(UPDATE_USER, { id: userId }))
  }

  _handleDelete = (userId) => (event) => {
    event.preventDefault()

    this.setState({ didDelete: true }, () => this.props.deleteUser(userId))
  }

  _handleDeleteResult = ({ errors }) => {
    if(errors && errors.size) return

    this.setState({ didDelete: false }, () => this.props.getUsers())
  }
}

export default ListUsers

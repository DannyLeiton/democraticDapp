import React from 'react'

import './styles.scss'

function UserFormContainer({ children }): ReactElement {
  return (
    <div className="user-form-container">
      {children}
    </div>
  )
}

export default UserFormContainer

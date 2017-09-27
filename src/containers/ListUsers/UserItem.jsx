import React from 'react'

function UserItem({ fullname, onUpdate, onDelete }): ReactElement {
  return (
    <li
      className="collection-item"
    >
      {fullname}
      <a href="#!" onClick={onDelete} className="secondary-content">
        <span>Eliminar</span>
      </a>
      <a href="#!" onClick={onUpdate} className="secondary-content">
        <span>Editar</span>
      </a>
    </li>
  )
}

export default UserItem

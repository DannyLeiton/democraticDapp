import React from 'react'

import './styles.scss'

function EmitVoteFormContainer({ children }): ReactElement {
  return (
    <div className="emit-vote-form-container">
      {children}
    </div>
  )
}

export default EmitVoteFormContainer

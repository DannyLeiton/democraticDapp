import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { EmitVoteForm, EmitVoteFormContainer } from 'components'
import { emitVote, getOptions } from 'actions/voteActions'

import './styles.scss'

@connect(
  ({ vote }) => ({
    fetching: vote.get('fetching'),
    errors: vote.get('errors'),
    options: vote.get('options'),
  }),
  { getOptions, emitVote }
)
class EmitVote extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { showSuccess: false }
  }

  componentWillReceiveProps(nextProps) {
    const { fetching: willBeFetching } = nextProps
    const { fetching } = this.props

    if(fetching && !willBeFetching) {
      this._handleEmitVoteResult(nextProps)
    }
  }

  render() {
    const { showSuccess } = this.state
    const { errors } = this.props

    return (
      <div>
        <div id="emit-vote" className="row">
          <EmitVoteFormContainer>
            {showSuccess && <span>Voto emitido correctamente</span>}
            <EmitVoteForm
              ref={(ref) => this._emitVoteForm = ref}
              buttonText="Emitir Voto"
              onSubmit={this._handleSubmit}
              errors={errors}
            />
          </EmitVoteFormContainer>
        </div>
      </div>
    )
  }

  _handleSubmit = (payload) => {
    this.props.emitVote(payload)
  }

  _handleEmitVoteResult = ({ errors }) => {
    if(errors && errors.size) return

    this._emitVoteForm.clearForm()
    this.setState({ showSuccess: true }, () => {
      setTimeout(() => this.setState({ showSuccess: false }), 2000)
    })
  }
}

export default EmitVote

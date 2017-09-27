import config from '../../config'

class VoteApi {
  constructor(parentRouter) {
    this.router = parentRouter
    this._createVoteApi()
  }

  _createVoteApi() {
    this.router.route('/vote')
    .post((req, res) => {
      const { candidateId, voterId, ...rest } = req.body
      if (Object.keys(rest).length) return res.sendStatus(400)

      config.contractInstance.voteForCandidate(candidateId, voterId, {from: config.account})

      res.status(200).send({ operation: 'Vote emmited correctly!' })
    })

    this.router.route('/vote/:candidateId')
      .get((req, res) => {
        const { candidateId, ...rest } = req.params
        if (Object.keys(rest).length) return res.sendStatus(400)

        const quantity = config.contractInstance.totalVotesFor.call(candidateId).toString()

        res.send({ candidateId, quantity })
      })
  }
}

export { VoteApi }

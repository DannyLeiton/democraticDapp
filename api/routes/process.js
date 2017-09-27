class ProcessApi {
  constructor(parentRouter) {
    this.router = parentRouter
    this._createProcessApi()
    this._voteTypes = {
      papeleta: [],
      referendum: ['pregunta'],
      opcionMultiple: ['min', 'max']
    }
  }

  _createProcessApi() {
    this.router.get('/process/list', (req, res) => {

      return res.send([
        {
          processId: '59c73b312345e552c6062307',
          name: 'Mi proceso de Papeleta',
          creatorId: '59c73b32c91ce552c6062307',
          initialDate: 1506241252946,
          endDate: 1506241262946,
          voteType: 'papeleta',
          votingType: 'privado',
          withProgress: true
        },
        {
          processId: '59c73b312345e552c6062308',
          name: 'Mi proceso de Referendum',
          creatorId: '59c73b32c91ce552c6062307',
          initialDate: 1506241252946,
          endDate: 1506241262946,
          voteType: 'referendum',
          votingType: 'publico',
          withProgress: false
        },
        {
          processId: '59c73b312345e552c6062309',
          name: 'Mi proceso de opcion multiple',
          creatorId: '59c73b32c91ce552c6062307',
          initialDate: 1506241252946,
          endDate: 1506241262946,
          voteType: 'opcionMultiple',
          votingType: 'privado',
          withProgress: true
        }
      ])
    })

    this.router.route('/process')
      .post((req, res) => {
        const { initialDate, endDate, voteType, votingType, specialOptions, ...rest } = req.body
        if (Object.keys(rest).length) return res.sendStatus(400)

        res.send({
          processId: 0
        })
      })

    this.router.route('/process/:processId')
      .get((req, res) => {
        const { processId, ...rest } = req.params
        if (Object.keys(rest).length) return res.sendStatus(400)

        return res.send({
          processId: '59c73b312345e552c6062307',
          name: 'Mi proceso de Papeleta',
          creatorId: '59c73b32c91ce552c6062307',
          initialDate: 1506241252946,
          endDate: 1506241262946,
          voteType: 'papeleta',
          votingType: 'privado',
          withProgress: true,
          options: JSON.stringify({}),
          voters: [
            { email: 'a@a.com' },
            { email: 'a@a.com' },
            { email: 'a@a.com' },
          ],
          results: [
            { candidateId: '60c73b312345e552c6062307', votes: 0 },
            { candidateId: '61c73b312345e552c6062307', votes: 0 },
            { candidateId: '62c73b312345e552c6062307', votes: 0 },
          ],
        })
      })
      .put((req, res) => {
        const { processId, ...restParams } = req.params
        const { initialDate, endDate, voteType, votingType, specialOptions, ...restBody } = req.body
        if (Object.keys(restParams).length || Object.keys(restBody).length) return res.sendStatus(400)

        res.send({
          processId: 0
        })
      })
      .delete((req, res) => {
        const { processId, ...rest } = req.params
        if (Object.keys(rest).length) return res.sendStatus(400)

        rest.sendStatus(200)
      })
  }
}

export { ProcessApi }

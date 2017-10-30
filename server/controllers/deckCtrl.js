let Deck = require('../models/deck')

const getDeckByGame = (req, res) => {
  let gameId = req.params.gameId

  Deck.find({_game: gameId}, (err, questions) => {
    res.send(err? {err:err}: questions)
  })
}

const getLimitedQByGame = (req, res) => {
  let gameId = req.params.gameId
  let limit = req.params.limit
  let idxs = []
  let i = 0
  let limited_questions = []

  Deck.find((err, questions) => {
    let len = questions.length
    if (len > limit) {
      while (i < limit) {
        let flag = true

        while (flag === true) {
          let r = Math.floor(Math.random() * (len - 0)) + 0

          if (!idxs.includes(r)) {
            flag = false
            limited_questions.push(questions[r])
            idxs.push(r)
            i++
          }
        }

      }
    } else limited_questions = questions
    res.send(err? {err:err}: limited_questions)
  })
}

const getQuestion = (req, res) => {
  let id = req.params.id

  Deck.findById(id, (err, question) => {
    res.send(err? {err:err}: question)
  })
}

const addQuestion = (req, res) => {
  let gameId = req.params.gameId

  let question = {
    _game: gameId,
    question: req.body.question || '',
    image: req.body.image || '',
    answer: req.body.answer || ''
  }
  let n_question = new Deck(question)

  n_question.save((err, n_question) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_question)
  })
}

const deleteQuestion = (req, res) => {
  let id = req.params.id

  Deck.findById(id, (err, question) => {
    if(err) res.send({err: 'Invalid Question'})
    else question.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editQuestion = (req, res) => {
  let id = req.params.id

  Deck.findById(id, (err, question) => {
    if(err) res.send({err: 'Invalid Question'})
    else {
      if (typeof req.body._game !== 'undefined') question._game = req.body._game
      if (typeof req.body.question !== 'undefined') question.question = req.body.question
      if (typeof req.body.image !== 'undefined') question.image = req.body.image
      if (typeof req.body.answer !== 'undefined') question.answer = req.body.answer

      question.save((err, n_question) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_question)
      })
    }
  })
}

module.exports = {
  getDeckByGame,
  getLimitedQByGame,
  getQuestion,
  addQuestion,
  deleteQuestion,
  editQuestion
}
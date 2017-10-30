let Game = require('../models/game')

const getGames = (req, res) => {
  Game.find((err, games) => {
    res.send(err? {err:err}: games)
  })
}

const getGame = (req, res) => {
  let id = req.params.id

  Game.findById(id, (err, game) => {
    res.send(err? {err:err}: game)
  })
}

const addGame = (req, res) => {
  let game = {
    isOnline: req.body.isOnline || '',
    name: req.body.name || '',
    descr: req.body.descr || '',
    poin: req.body.poin || 0,
    image: req.body.image || '',
    creator: req.body.creator
  }
  let n_game = new Game(game)

  n_game.save((err, n_game) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_game)
  })
}

const deleteGame = (req, res) => {
  let id = req.params.id

  Game.findById(id, (err, game) => {
    if(err) res.send({err: 'Invalid Game'})
    else game.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editGame = (req, res) => {
  let id = req.params.id

  Game.findById(id, (err, game) => {
    if(err) res.send({err: 'Invalid Game'})
    else {
      if (typeof req.body.isOnline !== 'undefined') game.isOnline = req.body.isOnline
      if (typeof req.body.name !== 'undefined') game.name = req.body.name
      if (typeof req.body.descr !== 'undefined') game.descr = req.body.descr
      if (typeof req.body.poin !== 'undefined') game.poin = req.body.poin
      if (typeof req.body.image !== 'undefined') game.image = req.body.image

      game.save((err, n_game) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_game)
      })
    }
  })
}

module.exports = {
  getGames,
  getGame,
  addGame,
  deleteGame,
  editGame,
}
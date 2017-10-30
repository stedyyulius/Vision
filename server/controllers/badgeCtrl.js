let Badge = require('../models/badge')

const getBadges = (req, res) => {
  Badge.find((err, badges) => {
    res.send(err? {err:err}: badges)
  })
}

const getBadge = (req, res) => {
  let id = req.params.id

  Badge.findById(id, (err, badge) => {
    res.send(err? {err:err}: badge)
  })
}

const addBadge = (req, res) => {
  let badge = {}
  if (typeof req.body.descr !== 'undefined') badge.descr = req.body.descr
  if (typeof req.body.image !== 'undefined') badge.image = req.body.image
  if (typeof req.body.poin !== 'undefined') badge.poin = req.body.poin

  let n_badge = new Badge(badge)

  n_badge.save((err, n_badge) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_badge)
  })
}

const deleteBadge = (req, res) => {
  let id = req.params.id

  Badge.findById(id, (err, badge) => {
    if(err) res.send({err: 'Invalid Badge'})
    else badge.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editBadge = (req, res) => {
  let id = req.params.id

  Badge.findById(id, (err, badge) => {
    if(err) res.send({err: 'Invalid Badge'})
    else {
      if (typeof req.body.descr !== 'undefined') badge.descr = req.body.descr
      if (typeof req.body.image !== 'undefined') badge.image = req.body.image
      if (typeof req.body.poin !== 'undefined') badge.poin = req.body.poin

      badge.save((err, n_badge) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_badge)
      })
    }
  })
}

module.exports = {
  getBadges,
  getBadge,
  addBadge,
  deleteBadge,
  editBadge,
}
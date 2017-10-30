let Reward = require('../models/reward')

const getRewards = (req, res) => {
  Reward.find((err, rewards) => {
    res.send(err? {err:err}: rewards)
  })
}

const getActiveRewards = (req, res) => {
  Reward.find({isActive: true}, (err, rewards) => {
    res.send(err? {err:err}: rewards)
  })
}

const getReward = (req, res) => {
  let id = req.params.id

  Reward.findById(id, (err, reward) => {
    res.send(err? {err:err}: reward)
  })
}

const addReward = (req, res) => {
  let reward = {}

  let descr = {}

  if (typeof req.body.poin !== 'undefined') reward.poin = req.body.poin
  if (typeof req.body.note !== 'undefined') descr.note = req.body.note
  if (typeof req.body.image !== 'undefined') descr.image = req.body.image
  if (typeof req.body.isActive !== 'undefined') reward.isActive = req.body.isActive


  if (!(Object.keys(descr).length === 0 && descr.constructor === Object)) reward.descr = descr

  let n_reward = new Reward(reward)

  n_reward.save((err, n_reward) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_reward)
  })
}

const deleteReward = (req, res) => {
  let id = req.params.id

  Reward.findById(id, (err, reward) => {
    if(err) res.send({err: 'Invalid Reward'})
    else reward.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editReward = (req, res) => {
  let id = req.params.id

  Reward.findById(id, (err, reward) => {
    if(err) res.send({err: 'Invalid Reward'})
    else {
      let descr = reward.descr || {}

      if (typeof req.body.poin !== 'undefined') reward.poin = req.body.poin
      if (typeof req.body.note !== 'undefined') descr.note = req.body.note
      if (typeof req.body.image !== 'undefined') descr.image = req.body.image
      if (typeof req.body.isActive !== 'undefined') reward.isActive = req.body.isActive

      if (!(Object.keys(descr).length === 0 && descr.constructor === Object)) reward.descr = descr

      reward.save((err, n_reward) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_reward)
      })
    }
  })

}

module.exports = {
  getRewards,
  getActiveRewards,
  getReward,
  addReward,
  deleteReward,
  editReward,
}
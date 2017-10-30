let Achievement = require('../models/achievement')

const getAchievements = (req, res) => {
  Achievement.find()
  .populate({
    path: 'achievement._komsel',
    select: 'name _id'
  })
  .exec((err, achievements) => {
    res.send(err? {err:err}: achievements)
  })
}

const getAchievement = (req, res) => {
  let id = req.params.id

  Achievement.findById(id, (err, achievement) => {
    res.send(err? {err:err}: achievement)
  })
}

const addAchievement = (req, res) => {
  let achievement = {
    _komsel: req.body.komsel || '',
    description: req.body.description || '',
    title: req.body.title || ''
  }
  let n_achievement = new Achievement(achievement)

  n_achievement.save((err, n_achievement) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_achievement)
  })
}

const deleteAchievement = (req, res) => {
  let id = req.params.id

  Achievement.findById(id, (err, achievement) => {
    if(err) res.send({err: 'Invalid Achievement'})
    else achievement.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editAchievement = (req, res) => {
  let id = req.params.id

  Achievement.findById(id, (err, achievement) => {
    if(err) res.send({err: 'Invalid Achievement'})
    else {
      if (typeof req.body.description !== 'undefined') achievement.description = req.body.description
      if (typeof req.body.title !== 'undefined') achievement.title = req.body.title

      achievement.save((err, n_achievement) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_achievement)
      })
    }
  })
}

module.exports = {
  getAchievements,
  getAchievement,
  addAchievement,
  deleteAchievement,
  editAchievement,
}
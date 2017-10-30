let User = require('../models/user')

const getUsers = (req, res) => {
  User.find((err, users) => {
    res.send(err? {err:err}: users)
  })
}

const getUser = (req, res) => {
  let id = req.params.id

  User.findById(id, (err, user) => {
    res.send(err? {err:err}: user)
  })
}

const deleteUser = (req, res) => {
  let id = req.params.id

  User.findById(id, (err, user) => {
    if(err) res.send({err: 'Invalid User'})
    else user.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editUser = (req, res) => {
  let id = req.params.id

  User.findById(id, (err, user) => {
    user.profile_picture = req.body.profile_picture || user.profile_picture
    user.name = req.body.name || user.name
    user.poin = req.body.poin || user.poin
    user.save((err,user)=> {res.send(err? {err:err}: user)})
  })
}

module.exports = {
  getUsers,
  getUser,
  editUser,
  deleteUser
}
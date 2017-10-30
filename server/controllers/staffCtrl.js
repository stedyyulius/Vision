let Staff = require('../models/staff')

const getStaffs = (req, res) => {
  Staff.find((err, staffs) => {
    res.send(err? {err:err}: staffs)
  })
}

const getStaff = (req, res) => {
  let id = req.params.id

  Staff.findById(id, (err, staff) => {
    res.send(err? {err:err}: staff)
  })
}

const addStaff = (req, res) => {
  let staff = {
    email: req.body.email || '',
    username: req.body.username || '',
    password: req.body.password || ''
  }
  let n_staff = new Staff(staff)

  n_staff.save((err, n_staff) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_staff)
  })
}

const deleteStaff = (req, res) => {
  let id = req.params.id

  Staff.findById(id, (err, staff) => {
    if(err) res.send({err: 'Invalid Staff'})
    else staff.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editStaff = (req, res) => {
  let id = req.params.id

  Staff.findById(id, (err, staff) => {
    if(err) res.send({err: 'Invalid Staff'})
    else {
      if (typeof req.body.email !== 'undefined') staff.email = req.body.email
      if (typeof req.body.username !== 'undefined') staff.username = req.body.username
      if (typeof req.body.password !== 'undefined') staff.password = req.body.password
      
      staff.save((err, n_staff) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_staff)
      })
    }
  })
}

module.exports = {
  getStaffs,
  getStaff,
  addStaff,
  deleteStaff,
  editStaff,
}
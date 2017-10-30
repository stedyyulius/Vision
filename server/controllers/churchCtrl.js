let Church = require('../models/church')

const getChurches = (req, res) => {
  Church.find((err, churches) => {
    res.send(err? {err:err}: churches)
  })
}

const getChurch = (req, res) => {
  let id = req.params.id

  Church.findById(id, (err, church) => {
    res.send(err? {err:err}: church)
  })
}

const addChurch = (req, res) => {
  let church = {}
  let location = {}
  let contact = {}

  if (typeof req.body.name !== 'undefined') church.name = req.body.name
  if (typeof req.body.lng !== 'undefined') location.lng = req.body.lng
  if (typeof req.body.lat !== 'undefined') location.lat = req.body.lat
  if (typeof req.body.pastor !== 'undefined') church.pastor = req.body.pastor
  if (typeof req.body.contact_name !== 'undefined') contact.name = req.body.contact_name
  if (typeof req.body.contact_role !== 'undefined') contact.role = req.body.contact_role
  if (typeof req.body.contact_phone !== 'undefined') contact.phone = req.body.contact_phone

  if (!(Object.keys(contact).length === 0 && contact.constructor === Object)) church.contact = contact
  if (!(Object.keys(location).length === 0 && location.constructor === Object)) church.location = location

  console.log(church)
  let n_church = new Church(church)

  n_church.save((err, n_church) => {
    if (err) {
      let err_msg = []
      for (let error in err.errors) err_msg.push(err.errors[error].message)
      res.send({err : err_msg.join(',')})
    } else res.send(n_church)
  })
}

const deleteChurch = (req, res) => {
  let id = req.params.id

  Church.findById(id, (err, church) => {
    if(err) res.send({err: 'Invalid Church'})
    else church.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editChurch = (req, res) => {
  let id = req.params.id

  Church.findById(id, (err, church) => {
    if(err) res.send({err: 'Invalid Church'})
    else {

      let location = church.location || {}
      let contact = church.contact || {}

      if (typeof req.body.name !== 'undefined') church.name = req.body.name
      if (typeof req.body.lng !== 'undefined') location.lng = req.body.lng
      if (typeof req.body.lat !== 'undefined') location.lat = req.body.lat
      if (typeof req.body.pastor !== 'undefined') church.pastor = req.body.pastor
      if (typeof req.body.contact_name !== 'undefined') contact.name = req.body.contact_name
      if (typeof req.body.contact_role !== 'undefined') contact.role = req.body.contact_role
      if (typeof req.body.contact_phone !== 'undefined') contact.phone = req.body.contact_phone

      if (!(Object.keys(contact).length === 0 && contact.constructor === Object)) church.contact = contact
      if (!(Object.keys(location).length === 0 && location.constructor === Object)) church.location = location


      church.save((err, n_church) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_church)
      })
    }
  })
}

module.exports = {
  getChurches,
  getChurch,
  addChurch,
  deleteChurch,
  editChurch,
}
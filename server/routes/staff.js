'use strict'
const express = require('express')
let router = express.Router()
const staffCtrl = require('../controllers/staffCtrl')

router.get('/', staffCtrl.getStaffs) //v
router.get('/:id', staffCtrl.getStaff) //v
router.post('/', staffCtrl.addStaff) //v
router.delete('/:id', staffCtrl.deleteStaff) //v
router.put('/:id', staffCtrl.editStaff) //v

module.exports = router
'use strict'
const express = require('express')
let router = express.Router()
const userCtrl = require('../controllers/userCtrl')

router.get('/', userCtrl.getUsers) //
router.get('/:id', userCtrl.getUser) //
router.put('/:id', userCtrl.editUser) //
router.delete('/:id', userCtrl.deleteUser) //


module.exports = router
'use strict'
const express = require('express')
let router = express.Router()
const churchCtrl = require('../controllers/churchCtrl')

router.get('/', churchCtrl.getChurches) //v
router.get('/:id', churchCtrl.getChurch) //v
router.post('/', churchCtrl.addChurch) //v
router.delete('/:id', churchCtrl.deleteChurch) //v
router.put('/:id', churchCtrl.editChurch) //v

module.exports = router
'use strict'
const express = require('express')
let router = express.Router()
const badgeCtrl = require('../controllers/badgeCtrl')

router.get('/', badgeCtrl.getBadges) //v
router.get('/:id', badgeCtrl.getBadge) //v
router.post('/', badgeCtrl.addBadge) //v
router.delete('/:id', badgeCtrl.deleteBadge) //v
router.put('/:id', badgeCtrl.editBadge) //v

module.exports = router
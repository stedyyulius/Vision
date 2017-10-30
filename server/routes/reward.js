'use strict'
const express = require('express')
let router = express.Router()
const rewardCtrl = require('../controllers/rewardCtrl')

router.get('/', rewardCtrl.getRewards) //v
router.get('/active', rewardCtrl.getActiveRewards) //v
router.get('/:id', rewardCtrl.getReward) //v
router.post('/', rewardCtrl.addReward) //v
router.delete('/:id', rewardCtrl.deleteReward) //v
router.put('/:id', rewardCtrl.editReward) //v

module.exports = router
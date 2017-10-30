'use strict'
const express = require('express')
let router = express.Router()
const achievementCtrl = require('../controllers/achievementCtrl')

router.get('/', achievementCtrl.getAchievements) //
router.get('/:id', achievementCtrl.getAchievement) //
router.post('/', achievementCtrl.addAchievement) //
router.delete('/:id', achievementCtrl.deleteAchievement) //
router.put('/:id', achievementCtrl.editAchievement) //

module.exports = router
'use strict'
const express = require('express')
let router = express.Router()
const gameCtrl = require('../controllers/gameCtrl')

router.get('/', gameCtrl.getGames) //v
router.get('/:id', gameCtrl.getGame) //v
router.post('/', gameCtrl.addGame) //v
router.delete('/:id', gameCtrl.deleteGame) //v
router.put('/:id', gameCtrl.editGame) //v

module.exports = router